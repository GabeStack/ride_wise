# Etapa 1: Build do projeto
FROM node:18-alpine AS builder

# Configuração do diretório de trabalho
WORKDIR /app

# Instalar dependências do projeto
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Build do projeto
RUN npm run build

# Etapa 2: Servir a aplicação estática
FROM nginx:stable-alpine

# Copiar os arquivos do build para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
