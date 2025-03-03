# Node.jsの公式イメージを使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をコピーしてインストール
COPY package.json package-lock.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# Next.jsの開発サーバーを起動
CMD ["npm", "run", "dev"]
