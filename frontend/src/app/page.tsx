"use client";

import { useEffect, useState } from "react";
import { getInfoFromRepoURL } from "./utils/infoFromURL";
import FileViewer from "../components/FileViewer";

type repoInfoProps = {
  owner: string;
  repo: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [fileTree, setFileTree] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [repoInfo, setRepoInfo] = useState<repoInfoProps | null>(null);

  // repoUrl が変更されたら、URLから owner と repo を抽出
  useEffect(() => {
    if (repoUrl) {
      const info = getInfoFromRepoURL(repoUrl);
      if (!info) {
        return;
      }
      setRepoInfo(info);
    }
  }, [repoUrl]);

  // GitHubリポジトリのファイル構造を取得
  const fetchRepoContents = async () => {
    if (!repoUrl) {
      alert("GitHubリポジトリURLを入力してください");
      return;
    }
    if (!repoInfo) {
      return;
    }

    // FastAPIのエンドポイントを叩く
    const response = await fetch(
      `http://localhost:8000/api/github/repo-contents?owner=${repoInfo.owner}&repo=${repoInfo.repo}`
    );

    const data = await response.json();
    setFileTree(data);
  };

  // 選択されたファイルをセット
  const handleSelectedFile = (filePath: string) => {
    setSelectedFile(filePath);
  };

  // バックエンドからのメッセージを取得（テスト用）
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
      {/* TODO: ファイル階層にするために再起処理を追加（後でこのコメント自体も見直す） */}
      <ul className="mt-4 pl-2 list-none">
        {fileTree.map((item) => (
          <li
            key={item.path}
            className="list-none cursor-pointer"
            onClick={() => handleSelectedFile(item.path)}
          >
            {item.type === "dir" ? "📁" : "📄"} {item.name}
          </li>
        ))}
      </ul>
      {repoInfo && selectedFile && (
        <FileViewer
          owner={repoInfo.owner}
          repo={repoInfo.repo}
          filePath={selectedFile}
        />
      )}
      <p className="mt-4 text-lg">バックエンドからのメッセージ: {message}</p>
    </main>
  );
}
