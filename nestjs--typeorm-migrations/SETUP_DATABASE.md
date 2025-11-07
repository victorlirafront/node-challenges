# 🗄️ Guia de Configuração do Banco de Dados MySQL

Este guia explica como iniciar e configurar o MySQL para o projeto.

## 📋 Opções de Instalação

### Opção 1: MySQL via Docker (Recomendado) 🐳

A forma mais fácil de ter o MySQL rodando:

#### 1. Instalar Docker Desktop
- Baixe em: https://www.docker.com/products/docker-desktop
- Instale o Docker Desktop
- **IMPORTANTE:** Abra o Docker Desktop e aguarde até que ele esteja completamente iniciado (ícone verde na bandeja do sistema)

#### 2. Verificar se Docker está rodando
```bash
docker --version
docker ps
```

Se receber um erro como "cannot connect to Docker daemon", significa que o Docker Desktop não está rodando. Nesse caso:
- Abra o Docker Desktop pelo menu Iniciar
- Aguarde alguns segundos até o ícone na bandeja do sistema ficar verde
- Tente novamente

#### 3. Iniciar MySQL com Docker
```bash
docker run --name mysql-nestjs -e MYSQL_ROOT_PASSWORD=root123 -e MYSQL_DATABASE=nestjs_db -p 3306:3306 -d mysql:8.0
```

Este comando:
- Cria um container MySQL chamado `mysql-nestjs`
- Define a senha do root como `root123`
- Cria o banco de dados `nestjs_db` automaticamente
- Expõe a porta 3306

#### 3. Verificar se está rodando
```bash
docker ps
```

#### 4. Parar o MySQL
```bash
docker stop mysql-nestjs
```

#### 5. Iniciar novamente (após parar)
```bash
docker start mysql-nestjs
```

#### 6. Remover o container (se necessário)
```bash
docker rm -f mysql-nestjs
```

---

### Opção 2: MySQL Instalado Localmente 💻

#### 1. Instalar MySQL
- Baixe o MySQL Community Server: https://dev.mysql.com/downloads/mysql/
- Durante a instalação, defina uma senha para o usuário `root`

#### 2. Iniciar o MySQL no Windows

**Via Serviços do Windows:**
1. Pressione `Win + R`
2. Digite `services.msc` e pressione Enter
3. Procure por "MySQL80" ou "MySQL"
4. Clique com botão direito → "Iniciar"

**Via PowerShell (como Administrador):**
```powershell
net start MySQL80
```

**Via Command Prompt (como Administrador):**
```cmd
net start MySQL80
```

#### 3. Verificar se está rodando
```bash
mysql --version
```

#### 4. Parar o MySQL
```powershell
net stop MySQL80
```

---

### Opção 3: XAMPP (Mais Fácil para Iniciantes) 🚀

#### 1. Instalar XAMPP
- Baixe em: https://www.apachefriends.org/
- Instale o XAMPP

#### 2. Iniciar MySQL
1. Abra o XAMPP Control Panel
2. Clique em "Start" ao lado do MySQL

#### 3. Configurações
- Porta padrão: 3306
- Usuário padrão: `root`
- Senha padrão: (vazio)

---

## ⚙️ Configuração do Projeto

### 1. Criar arquivo `.env`

Copie o arquivo de exemplo:
```bash
copy env.example .env
```

### 2. Editar o arquivo `.env`

Abra o arquivo `.env` e configure com suas credenciais:

**Para Docker (senha: root123):**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root123
DB_DATABASE=nestjs_db
```

**Para XAMPP (sem senha):**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=nestjs_db
```

**Para MySQL local:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=nestjs_db
```

### 3. Criar o banco de dados (se não foi criado automaticamente)

**Via linha de comando:**
```bash
mysql -u root -p
```

Depois execute:
```sql
CREATE DATABASE IF NOT EXISTS nestjs_db;
EXIT;
```

**Ou via Docker:**
```bash
docker exec -it mysql-nestjs mysql -u root -proot123 -e "CREATE DATABASE IF NOT EXISTS nestjs_db;"
```

---

## 🔄 Executar Migrations

Após o banco estar rodando, execute as migrations:

```bash
npm run migration:run
```

Isso criará a tabela `users` no banco de dados.

---

## ✅ Verificar se está funcionando

### Testar conexão com o banco:

```bash
mysql -u root -p -e "USE nestjs_db; SHOW TABLES;"
```

Ou via Docker:
```bash
docker exec -it mysql-nestjs mysql -u root -proot123 -e "USE nestjs_db; SHOW TABLES;"
```

### Iniciar a aplicação:

```bash
npm run start:dev
```

Se tudo estiver correto, você verá a mensagem:
```
Application is running on: http://localhost:3000
```

---

## 🛠️ Comandos Úteis

### MySQL via Docker

```bash
# Ver logs do container
docker logs mysql-nestjs

# Acessar MySQL via terminal
docker exec -it mysql-nestjs mysql -u root -proot123

# Backup do banco
docker exec mysql-nestjs mysqldump -u root -proot123 nestjs_db > backup.sql

# Restaurar backup
docker exec -i mysql-nestjs mysql -u root -proot123 nestjs_db < backup.sql
```

### MySQL Local

```bash
# Acessar MySQL
mysql -u root -p

# Listar bancos de dados
SHOW DATABASES;

# Usar o banco
USE nestjs_db;

# Ver tabelas
SHOW TABLES;

# Ver estrutura da tabela
DESCRIBE users;
```

---

## ❌ Solução de Problemas

### Erro: "Can't connect to MySQL server"
- Verifique se o MySQL está rodando
- Verifique se a porta 3306 está correta
- Verifique o firewall

### Erro: "Access denied for user"
- Verifique o usuário e senha no `.env`
- Para MySQL local, pode ser necessário criar o usuário

### Erro: "Unknown database"
- Crie o banco de dados manualmente
- Verifique o nome do banco no `.env`

### Porta 3306 já em uso
- Pare outros serviços MySQL
- Ou use outra porta e atualize o `.env`

---

## 📝 Próximos Passos

1. ✅ Banco de dados MySQL rodando
2. ✅ Arquivo `.env` configurado
3. ✅ Banco de dados `nestjs_db` criado
4. ✅ Migrations executadas (`npm run migration:run`)
5. ✅ Aplicação iniciada (`npm run start:dev`)

Agora você pode testar a API em `http://localhost:3000/users`!
