# 🍷 WineBook - Backend

Backend GraphQL desenvolvido com NestJS, TypeORM e PostgreSQL.

## 🚀 Setup

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar PostgreSQL

Crie um banco de dados chamado `winebook`:

```sql
CREATE DATABASE winebook;
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto backend:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=winebook
```

### 4. Executar o servidor

```bash
npm run start:dev
```

O servidor GraphQL estará rodando em: `http://localhost:4000/graphql`

## 📚 Entidades

- **User**: Usuários do sistema
- **Wine**: Vinhos do catálogo
- **Review**: Avaliações dos vinhos

## 🔍 Queries GraphQL

- `wines(filter: String)`: Lista todos os vinhos
- `wine(id: ID!)`: Busca um vinho específico
- `users`: Lista todos os usuários
- `user(id: ID!)`: Busca um usuário específico
- `reviews`: Lista todas as avaliações

## ✏️ Mutations GraphQL

- `createWine`: Adiciona um novo vinho
- `createUser`: Cria um novo usuário
- `createReview`: Adiciona uma avaliação
- `toggleFavorite`: Adiciona/remove vinho dos favoritos
