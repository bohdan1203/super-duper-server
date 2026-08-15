"use client";

import { useState } from "react";

export default function Page() {
  const [text, setText] = useState<string>("");

  return (
    <div>
      <p>{text}</p>
      <button
        onClick={() => {
          fetch("/api/lorem")
            .then((res) => res.text())
            .then((data) => setText(data))
            .catch((err) => setText(err.message));
        }}
      >
        Fetch
      </button>
    </div>
  );
}
