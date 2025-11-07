# NestJS + TypeORM + MySQL

Projeto NestJS configurado com TypeORM e MySQL usando TypeScript.

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- MySQL instalado e rodando

## 🚀 Instalação

> ⚡ **Para um início rápido, consulte [QUICK_START.md](./QUICK_START.md)**

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd migrations-typeorm
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do MySQL:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=nestjs_db
```

4. Inicie o banco de dados MySQL:

**Opção A: Via Docker (Recomendado - Mais Fácil)**
```bash
# IMPORTANTE: Certifique-se de que o Docker Desktop está rodando antes!

# Usando script PowerShell (Windows)
.\start-mysql.ps1

# Ou usando npm
npm run docker:up

# Ou manualmente
docker-compose up -d
```

⚠️ **Se receber erro "cannot connect to Docker daemon":**
- Abra o Docker Desktop pelo menu Iniciar
- Aguarde até o ícone na bandeja ficar verde
- Tente novamente

**Opção B: MySQL Local (Sem Docker)**
- **XAMPP:** Abra XAMPP Control Panel → Clique em "Start" no MySQL
- **MySQL Local:** `net start MySQL80` (PowerShell como Administrador)

5. Crie o banco de dados (se não foi criado automaticamente):
```sql
CREATE DATABASE nestjs_db;
```

📖 **Para instruções detalhadas, consulte o arquivo [SETUP_DATABASE.md](./SETUP_DATABASE.md)**

## 🏃 Executando o projeto

### Modo desenvolvimento
```bash
npm run start:dev
```

### Modo produção
```bash
npm run build
npm run start:prod
```

A aplicação estará rodando em `http://localhost:3000`

## 📦 Scripts disponíveis

- `npm run start:dev` - Inicia o servidor em modo desenvolvimento (watch mode)
- `npm run build` - Compila o projeto TypeScript
- `npm run start:prod` - Inicia o servidor em modo produção
- `npm run test` - Executa os testes
- `npm run lint` - Executa o linter

### Scripts Docker (MySQL)
- `npm run docker:up` - Inicia o MySQL via Docker
- `npm run docker:down` - Para e remove o container MySQL
- `npm run docker:stop` - Para o container MySQL
- `npm run docker:start` - Inicia o container MySQL
- `npm run docker:logs` - Ver logs do MySQL

## 🔄 Migrations

Uma migration para criar a tabela `users` já foi criada em `src/migrations/1699123456789-CreateUser.ts`.

### Executar migrations
```bash
npm run migration:run
```

Isso criará a tabela `users` no banco de dados com os campos:
- `id` - Chave primária auto-incremento
- `name` - Nome do usuário (VARCHAR 100)
- `email` - Email único (VARCHAR 255)
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Reverter última migration
```bash
npm run migration:revert
```

### Gerar uma nova migration
Se você modificar uma entidade existente ou criar uma nova, pode gerar uma migration automaticamente:
```bash
npm run migration:generate -- src/migrations/NomeDaMigration
```

**Importante:** Certifique-se de que o banco de dados está criado e as credenciais no arquivo `.env` estão corretas antes de executar as migrations.

## 📁 Estrutura do projeto

```
src/
├── config/          # Configurações (database.config.ts)
├── database/        # Módulo e configuração do banco de dados
│   └── entities/    # Entidades do TypeORM
├── migrations/      # Migrations do TypeORM
├── users/           # Módulo de usuários (CRUD)
│   ├── dto/         # DTOs de validação
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.module.ts    # Módulo principal
├── app.controller.ts
├── app.service.ts
└── main.ts          # Arquivo de entrada
```

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para TypeScript/JavaScript
- **MySQL** - Banco de dados relacional
- **TypeScript** - Superset do JavaScript

## 📝 Criando uma entidade

Exemplo de entidade em `src/database/entities/user.entity.ts`:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

Depois de criar a entidade, você pode gerar uma migration:
```bash
npm run migration:generate -- src/migrations/CreateUser
```

## 🔗 Endpoints da API

### Endpoints gerais
- `GET /` - Hello World
- `GET /health` - Health check

### CRUD de Usuários (`/users`)

#### Criar usuário
```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com"
}
```

#### Listar todos os usuários
```http
GET /users
```

#### Buscar usuário por ID
```http
GET /users/:id
```

#### Atualizar usuário
```http
PATCH /users/:id
Content-Type: application/json

{
  "name": "João Santos",
  "email": "joao.santos@example.com"
}
```

#### Deletar usuário
```http
DELETE /users/:id
```

### Validações

- **Nome**: obrigatório, string, máximo 100 caracteres
- **Email**: obrigatório, formato de email válido, máximo 255 caracteres, único no banco

### Códigos de resposta

- `201` - Criado com sucesso
- `200` - Sucesso
- `204` - Deletado com sucesso (sem conteúdo)
- `400` - Erro de validação
- `404` - Usuário não encontrado
- `409` - Email já cadastrado

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.
