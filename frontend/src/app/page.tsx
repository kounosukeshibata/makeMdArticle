"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/";
    // fetch("http://backend:8000/")
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">技術記事自動生成 & 最適化ツール</h1>
      <p className="mt-4 text-lg">バックエンドからのメッセージ: {message}</p>
    </main>
  );
}
