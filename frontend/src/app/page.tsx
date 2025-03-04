"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [fileTree, setFileTree] = useState<any[]>([]);

  const fetchRepoContents = async () => {
    if (!repoUrl) {
      alert("GitHubリポジトリURLを入力してください");
      return;
    }

    // URLから owner と repo を抽出
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      alert("正しいGitHubリポジトリURLを入力してください");
      return;
    }
    const owner = match[1];
    const repo = match[2];

    // FastAPIのエンドポイントを叩く
    const response = await fetch(
      `http://localhost:8000/api/github/repo-contents?owner=${owner}&repo=${repo}`
    );
    const data = await response.json();
    console.log(data);
    setFileTree(data);
  };

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
    <main className="p-4">
      <h1 className="text-2xl font-bold">技術記事自動生成 & 最適化ツール</h1>
      <h2 className="text-2xl font-bold mb-4">
        GitHubリポジトリのファイル構造を取得
      </h2>
      <input
        type="text"
        placeholder="GitHubリポジトリのURLを入力"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={fetchRepoContents}
        className="bg-blue-500 text-white p-2 rounded"
      >
        取得
      </button>
      <ul className="mt-4 pl-2 list-none">
        {fileTree.map((item) => (
          <li key={item.path} className="list-none">
            {item.type === "dir" ? "📁" : "📄"} {item.name}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-lg">バックエンドからのメッセージ: {message}</p>
    </main>
  );
}
