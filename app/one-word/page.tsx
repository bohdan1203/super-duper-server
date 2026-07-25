"use client";

import { useState, type SubmitEvent } from "react";
import { WordType } from "../../types";

export default function Page() {
  const [words, setWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [wordType, setWordType] = useState<WordType>(WordType.Noun);
  const [minLength, setMinLength] = useState<number>(4);
  const [maxLength, setMaxLength] = useState<number>(4);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ exclude: words.join(",") });

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/one-word?type=${wordType}&minLength=${minLength}&maxLength=${maxLength}&${params}`,
      );
      const text = await response.text();

      if (!response.ok) {
        throw new Error(text);
      }

      const word = text;
      setWords([word, ...words]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={wordType}
          onChange={(e) => setWordType(e.target.value as WordType)}
        >
          <option value="noun">Noun</option>
          <option value="verb">Verb</option>
          <option value="adjective">Adjective</option>
        </select>
        <input
          type="number"
          value={minLength}
          onChange={(e) => setMinLength(Number(e.target.value))}
        />
        <input
          type="number"
          value={maxLength}
          onChange={(e) => setMaxLength(Number(e.target.value))}
        />
        <button>Fetch Word</button>
      </form>
      <p>Fetched {words.length} words</p>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}
