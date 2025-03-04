import httpx
from fastapi import APIRouter

router = APIRouter()

GITHUB_API_URL = "https://api.github.com/repos"

@router.get("/github/repo-contents")
async def get_repo_contents(owner: str, repo: str, path: str = ""):
    """GitHubのリポジトリのファイル構造を取得"""
    url = f"{GITHUB_API_URL}/{owner}/{repo}/contents/{path}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code != 200:
            return {"error": "Failed to fetch repository contents"}
    
    return response.json()
