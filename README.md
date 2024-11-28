# Ride Wise

Ride Wise é uma aplicação de gerenciamento de viagens que permite estimar preços, selecionar motoristas e visualizar o histórico de viagens realizadas.

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **Backend**: [AdonisJS](https://adonisjs.com/) (Node.js)
- **Frontend**: [React](https://reactjs.org/) com [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [Zustand](https://zustand-demo.pmnd.rs/) e [TailwindCSS](https://tailwindcss.com/)
- **Banco de Dados**: PostgreSQL
- **Mapas**: [React Leaflet](https://react-leaflet.js.org/) para renderização de mapas interativos.
- **Containerização**: Docker e Docker Compose para implantação simplificada.
- **APIs Externas**: Integração com a [Google Maps Routes API](https://developers.google.com/maps/documentation/routes/overview?hl=pt-br) para cálculo de rotas e distâncias.

---

## 📦 Instalação e Configuração

### 1. Pré-requisitos
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/download/package-manager) (para desenvolvimento local)
- Uma chave de API do Google Maps com a [Routes API](https://developers.google.com/maps/documentation/routes/overview?hl=pt-br) ativada.

### 2. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/ride-wise.git
cd ride-wise
```
### 3. Configurar variáveis de ambiente

- No arquivo .env na raiz do projeto, terá que coloco a chave de API do Google Maps com Routes API no campo, GOOGLE_API_KEY

### 4. Comando construir e iniciar o container

```bash
- Para docker:

docker-compose up --build 

- Para Podman: 

podman compose up

```

### 5. Acesso da aplicação

Acessar a aplicação

-Frontend: http://localhost

-Backend: http://localhost:8080