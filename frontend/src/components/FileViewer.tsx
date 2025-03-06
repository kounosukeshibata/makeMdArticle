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

const getLanguageFromFilePath = (filePath: string) => {
  const extension = filePath.split(".").pop();
  switch (extension) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "py":
      return "python";
    case "java":
      return "java";
    case "rb":
      return "ruby";
    case "go":
      return "go";
    case "php":
      return "php";
    case "html":
      return "html";
    case "css":
      return "css";
    case "json":
      return "json";
    case "md":
      return "markdown";
    default:
      return "plaintext";
  }
};

export default function FileViewer({
  owner,
  repo,
  filePath,
  setErrorMessage,
}: FileViewerProps) {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const handleFileClick = async () => {
    setSelectedText(null);
    const content = await fetchFileFromBackend(
      owner,
      repo,
      filePath,
      setErrorMessage
    );
    setFileContent(content);
  };

  // 選択範囲を取得
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      setSelectedText(selection.toString());
    }
  };

  const language = getLanguageFromFilePath(filePath);

  return (
    <div>
      <button
        onClick={handleFileClick}
        className="border p-2 m-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
      >
        {filePath} のコードを表示
      </button>

      {fileContent && (
        <pre
          onMouseUp={handleSelection}
          className="border p-4 bg-gray-100 overflow-auto"
        >
          <SyntaxHighlighter language={language} style={oneDark}>
            {fileContent}
          </SyntaxHighlighter>
        </pre>
      )}
      {selectedText && (
        <div>
          <h3>選択されたコード:</h3>
          <pre className="border p-4 bg-gray-100 overflow-auto">
            <SyntaxHighlighter language={language} style={oneDark}>
              {selectedText}
            </SyntaxHighlighter>
          </pre>
          <button
            onClick={() => console.log(selectedText)}
            className="border p-2 m-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            このコードを解説
          </button>
        </div>
      )}
    </div>
  );
}
