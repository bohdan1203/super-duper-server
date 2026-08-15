import { type NextRequest } from "next/server";
import { faker } from "@faker-js/faker";

const headers = {
  "Content-Type": "text/plain",
  "Access-Control-Allow-Origin": "*",
};

export async function GET(request: NextRequest): Promise<Response> {
  const sentenceCount = Number(
    request.nextUrl.searchParams.get("sentenceCount") ?? 1,
  );

  return new Response(faker.lorem.paragraph(sentenceCount), {
    headers,
  });
}
