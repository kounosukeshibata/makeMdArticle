"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://backend:8000/")
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
