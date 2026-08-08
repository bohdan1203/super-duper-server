"use client";

import { useState } from "react";

export default function Page() {
  const [reps, setReps] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reps <= 0) {
      return alert("Reps must be at least 1");
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/pull-ups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reps, date, time }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit pull-up data");
      }
    } catch (error) {
      setIsLoading(false);
      alert("Failed to submit pull-up data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Pull-Up Tracker</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 flex flex-col gap-5 w-full max-w-sm"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Reps</label>
          <input
            type="number"
            value={reps}
            min={1}
            onChange={(e) => setReps(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 10"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-2 transition-colors"
        >
          {isLoading ? "Saving..." : "Add Pull-Up"}
        </button>
      </form>
    </div>
  );
}
