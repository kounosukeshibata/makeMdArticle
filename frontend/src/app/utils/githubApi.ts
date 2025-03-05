export async function fetchFileFromBackend(
  owner: string,
  repo: string,
  path: string,
  setErrorMessage: (message: string) => void,
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
      const errorData = await response.json();
      const errorMessage =
        errorData.detail || "Failed to fetch file from backend";
      console.error("Error fetching file from backend:", errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("Error:", errorMessage);
    setErrorMessage(errorMessage);
    return null;
  }
}
