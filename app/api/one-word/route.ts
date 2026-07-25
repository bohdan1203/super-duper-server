import { type NextRequest } from "next/server";
import { faker } from "@faker-js/faker";
import { WordType } from "@/types";

const headers = {
  "Content-Type": "text/plain",
  "Access-Control-Allow-Origin": "*",
};

export async function GET(request: NextRequest): Promise<Response> {
  const typeParam = request.nextUrl.searchParams.get("type") ?? WordType.Noun;
  const validTypes = Object.values(WordType);

  if (!validTypes.includes(typeParam as WordType)) {
    return new Response(
      `Invalid type. Must be one of: ${validTypes.join(", ")}`,
      {
        status: 400,
        headers,
      },
    );
  }

  const type = typeParam as WordType;
  const minLength = Number(request.nextUrl.searchParams.get("minLength") ?? 4);
  const maxLength = Number(request.nextUrl.searchParams.get("maxLength") ?? 4);
  const exclude = new Set(
    request.nextUrl.searchParams.get("exclude")?.split(",").filter(Boolean),
  );

  let failedAttempts = 0;

  while (true) {
    const word = faker.word[type]({
      length: { min: minLength, max: maxLength },
      strategy: "closest",
    });

    if (!exclude.has(word)) {
      return new Response(word, { headers });
    }

    failedAttempts++;

    if (failedAttempts > 1000) {
      return new Response(
        "You ran out of words! Change parameters and try again.",
        {
          status: 422,
          headers,
        },
      );
    }
  }
}
