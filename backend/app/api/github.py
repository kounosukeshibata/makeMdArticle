import httpx
from fastapi import APIRouter, HTTPException
import requests
import os
import base64

router = APIRouter()

GITHUB_API_URL = "https://api.github.com/repos"
GITHUB_API_TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {"Authorization": f"token {GITHUB_API_TOKEN}"} if GITHUB_API_TOKEN else {}


@router.get("/github/repo-contents")
def get_repo_contents(owner: str, repo: str, path: str = ""):
    """GitHubのリポジトリのファイル構造を取得"""
    url = f"{GITHUB_API_URL}/{owner}/{repo}/contents/{path}"
    
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code >= 400 and response.status_code < 500:
        raise HTTPException(status_code=400, detail="Bad Request: GitHub API request failed (Client Error)")
    elif response.status_code >= 500:
        raise HTTPException(status_code=500, detail="Internal Server Error: GitHub API request failed (Server Error)")
    
    return response.json()


@router.get("/github/file")
async def get_github_file(owner: str, repo: str, path: str, branch: str = "main"):
    """ GitHub のファイル内容を取得する """
    url = f"{GITHUB_API_URL}/{owner}/{repo}/contents/{path}?ref={branch}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS)
        
        if response.status_code >= 400 and response.status_code < 500:
            raise HTTPException(status_code=400, detail="Bad Request: GitHub API request failed (Client Error)")
        elif response.status_code >= 500:
            raise HTTPException(status_code=500, detail="Internal Server Error: GitHub API request failed (Server Error)")
    
    data = response.json()
    
    # Base64 エンコードされているのでデコード
    file_content = base64.b64decode(data["content"]).decode("utf-8")

    return {"content": file_content}
