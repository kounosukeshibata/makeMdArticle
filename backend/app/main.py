import os
from fastapi import FastAPI
from dotenv import load_dotenv

# .envを読み込む
load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": f"Hello from FastAPI! Debug Mode: {os.getenv('DEBUG')}"}
