# Etapa 1: Configuração do ambiente de build
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos de configuração e dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Compilar o projeto (se necessário)
RUN npm run build

# Etapa 2: Configuração do ambiente de produção
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos compilados e dependências para o container final
COPY --from=builder /app .

# Copiar o arquivo .env para o container
COPY .env .env

# Expor a porta padrão do AdonisJS
EXPOSE 3333

# Definir a variável de ambiente para produção
ENV NODE_ENV=production

# Rodar migrations e seeders antes de iniciar o servidor
CMD ["sh", "-c", "node ace migration:run --force && node ace db:seed && node build/server.js"]
