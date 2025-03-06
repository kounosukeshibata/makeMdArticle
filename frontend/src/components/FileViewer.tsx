"use client";

import { useState } from "react";
import { fetchFileFromBackend } from "../app/utils/githubApi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface FileViewerProps {
  owner: string;
  repo: string;
  filePath: string;
  setErrorMessage: (message: string) => void;
}

export default function FileViewer({
  owner,
  repo,
  filePath,
  setErrorMessage,
}: FileViewerProps) {
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileClick = async () => {
    const content = await fetchFileFromBackend(
      owner,
      repo,
      filePath,
      setErrorMessage
    );
    setFileContent(content);
  };

  return (
    <div>
      <button
        onClick={handleFileClick}
        className="border p-2 m-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
      >
        {filePath} のコードを表示
      </button>

      {fileContent && (
        <pre className="border p-4 bg-gray-100 overflow-auto">
          <SyntaxHighlighter language="javascript" style={oneDark}>
            {fileContent}
          </SyntaxHighlighter>
        </pre>
      )}
    </div>
  );
}
