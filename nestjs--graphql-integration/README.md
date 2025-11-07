# 🍷 WineBook - Projeto GraphQL Completo

Catálogo de Vinhos com Favoritos e Avaliações

## 📁 Estrutura do Projeto

```
graphql/
├── backend/          # NestJS + GraphQL + TypeORM + PostgreSQL
└── frontend/         # React + Apollo Client + TailwindCSS
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL
- npm ou yarn

### Backend

1. Entre na pasta backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o PostgreSQL:
   - Crie um banco de dados chamado `winebook`:
   ```sql
   CREATE DATABASE winebook;
   ```

4. Configure as credenciais do banco em `src/app.module.ts` (linhas 22-27):
   ```typescript
   host: 'localhost',
   port: 5432,
   username: 'postgres',  // seu usuário
   password: 'postgres',  // sua senha
   database: 'winebook',
   ```

5. Execute o servidor:
```bash
npm run start:dev
```

O servidor GraphQL estará disponível em: **http://localhost:4000/graphql**

### Frontend

1. Abra um novo terminal e entre na pasta frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm start
```

A aplicação estará disponível em: **http://localhost:3000**

## 🎯 O que você vai aprender

- ✅ Criar e consultar **Queries e Mutations GraphQL** no NestJS
- ✅ Estruturar **Resolvers e Services**
- ✅ Lidar com **Autenticação e Relacionamentos** (ManyToMany, OneToMany)
- ✅ Integrar o **Apollo Client** com React
- ✅ Entender como GraphQL substitui REST
- ✅ Usar TypeORM para gerenciar banco de dados

## 📚 Tecnologias

**Backend:**
- NestJS
- GraphQL (Apollo)
- TypeORM
- PostgreSQL

**Frontend:**
- React 18
- Apollo Client
- TailwindCSS
- React Router

## 🔍 Queries GraphQL Disponíveis

```graphql
# Buscar vinhos
query {
  wines(filter: "Brasil") {
    id
    name
    type
    country
    reviews {
      rating
      comment
      user {
        name
      }
    }
  }
}

# Buscar vinho específico
query {
  wine(id: "1") {
    name
    country
    type
    reviews {
      rating
      comment
    }
  }
}

# Buscar usuários
query {
  users {
    id
    name
    email
    favorites {
      name
    }
  }
}
```

## ✏️ Mutations GraphQL Disponíveis

```graphql
# Criar vinho
mutation {
  createWine(createWineInput: {
    name: "Château Margaux"
    type: "Tinto"
    country: "França"
    grape: "Cabernet Sauvignon"
    year: 2018
  }) {
    id
    name
  }
}

# Criar usuário
mutation {
  createUser(createUserInput: {
    name: "João Silva"
    email: "joao@example.com"
    password: "senha123"
  }) {
    id
    name
    email
  }
}

# Adicionar avaliação
mutation {
  createReview(createReviewInput: {
    userId: 1
    wineId: 1
    rating: 5
    comment: "Excelente vinho!"
  }) {
    id
    rating
    comment
  }
}

# Adicionar/remover dos favoritos
mutation {
  toggleFavorite(userId: 1, wineId: 1) {
    id
    favorites {
      name
    }
  }
}
```

## 📖 Próximos Passos

1. Teste as queries no GraphQL Playground: http://localhost:4000/graphql
2. Crie alguns vinhos e usuários no banco de dados
3. Explore as funcionalidades do frontend
4. Experimente adicionar mais features!

Bons estudos! 🎉
