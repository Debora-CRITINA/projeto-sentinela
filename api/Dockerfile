Dockerfile
# Imagem base Node.js
FROM node:20

WORKDIR /app

# Copia as dependências e instala os pacotes
COPY package.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]
