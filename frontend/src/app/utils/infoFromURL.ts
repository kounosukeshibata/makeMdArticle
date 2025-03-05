export function getInfoFromRepoURL(
  repoUrl: string
): { owner: string; repo: string } | null {
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    alert("正しいGitHubリポジトリURLを入力してください");
    return null;
  }
  const owner = match[1];
  const repo = match[2];

  return { owner, repo };
}
