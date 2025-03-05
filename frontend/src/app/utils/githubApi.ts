export async function fetchFileFromBackend(
  owner: string,
  repo: string,
  path: string,
  branch = "main"
) {
  const hostUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"; // Railway の URL に変更
  const routingUrl = "/api/github/file";
  const backendUrl = hostUrl + routingUrl;

  try {
    const response = await fetch(
      `${backendUrl}?owner=${owner}&repo=${repo}&path=${path}&branch=${branch}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching file from backend:", error);
    return null;
  }
}
