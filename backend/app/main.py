import os
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from app.api.github import router as github_router

# .envを読み込む
load_dotenv()

app = FastAPI()

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じて適切なオリジンを設定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB セッションを取得する関数
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/db_test")
def db_test(db: Session = Depends(get_db)):
    return {"message": "Database connection successful"}

@app.get("/")
def read_root():
    return {"message": f"Hello from FastAPI! Debug Mode: {os.getenv('DEBUG')}"}


# ルーターを登録
app.include_router(github_router, prefix="/api")