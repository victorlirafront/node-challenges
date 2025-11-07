# 🚀 Início Rápido

## Passo a Passo Rápido para Começar

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Escolher uma Opção para o MySQL

#### Opção A: Docker (Mais Fácil) 🐳

**Pré-requisito:** Docker Desktop instalado e rodando

1. **Iniciar Docker Desktop**
   - Abra o Docker Desktop pelo menu Iniciar
   - Aguarde até o ícone na bandeja ficar verde (pode demorar 1-2 minutos)

2. **Iniciar MySQL**
   ```bash
   npm run docker:up
   ```

3. **Verificar se está rodando**
   ```bash
   docker ps
   ```
   Você deve ver o container `mysql-nestjs` rodando.

#### Opção B: MySQL Local 💻

**Se você já tem MySQL instalado:**

1. **Iniciar MySQL** (PowerShell como Administrador):
   ```powershell
   net start MySQL80
   ```

2. **Ou usar XAMPP:**
   - Abra XAMPP Control Panel
   - Clique em "Start" ao lado do MySQL

### 3️⃣ Configurar Variáveis de Ambiente

1. **Criar arquivo .env:**
   ```bash
   copy env.example .env
   ```

2. **Editar .env** com suas credenciais:

   **Para Docker:**
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=root123
   DB_DATABASE=nestjs_db
   ```

   **Para MySQL Local/XAMPP:**
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=sua_senha
   DB_DATABASE=nestjs_db
   ```

### 4️⃣ Executar Migrations

```bash
npm run migration:run
```

Isso criará a tabela `users` no banco de dados.

### 5️⃣ Iniciar a Aplicação

```bash
npm run start:dev
```

### 6️⃣ Testar a API

A aplicação estará rodando em: **http://localhost:3000**

**Testar criação de usuário:**
```bash
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com"
}
```

---

## ❌ Problemas Comuns

### Erro: "cannot connect to Docker daemon"
**Solução:** O Docker Desktop não está rodando. Abra o Docker Desktop e aguarde iniciar completamente.

### Erro: "Access denied for user"
**Solução:** Verifique o usuário e senha no arquivo `.env`

### Erro: "Unknown database"
**Solução:** O banco de dados não existe. Se estiver usando Docker, ele é criado automaticamente. Se estiver usando MySQL local, crie manualmente:
```sql
CREATE DATABASE nestjs_db;
```

### Erro: "Port 3306 already in use"
**Solução:** Outro serviço MySQL está usando a porta 3306. Pare o outro serviço ou use outra porta.

---

## 📚 Mais Informações

Para instruções detalhadas, consulte [SETUP_DATABASE.md](./SETUP_DATABASE.md)
