# Prisma Migrations

## Como funciona no Prisma

No Prisma, as migrations funcionam de forma diferente do TypeORM:

- **TypeORM**: Tem métodos `up()` e `down()` explícitos
- **Prisma**: As migrations são arquivos SQL que são executados sequencialmente

## Estrutura das Migrations

Cada migration na pasta `migrations/` contém:
- `migration.sql` - O SQL que será executado (equivalente ao `up()`)
- `down.sql` (opcional) - SQL para reverter manualmente (documentação do rollback)

## Comandos Disponíveis

### Criar uma nova migration
```bash
npm run db:migrate -- --name nome_da_migration
```

### Aplicar migrations pendentes
```bash
npm run db:migrate:deploy
```

### Verificar status das migrations
```bash
npm run db:migrate:status
```

### Marcar uma migration como aplicada/revertida
```bash
npm run db:migrate:resolve -- --applied nome_da_migration
npm run db:migrate:resolve -- --rolled-back nome_da_migration
```

## Como Reverter uma Migration

O Prisma não tem rollback automático. Existem duas abordagens:

### 1. Abordagem Manual (usando down.sql)

Se a migration tem um arquivo `down.sql`, você pode executá-lo manualmente:

```bash
# 1. Marcar a migration como revertida
npm run db:migrate:resolve -- --rolled-back nome_da_migration

# 2. Executar o SQL do down.sql manualmente no banco
# (use Prisma Studio ou cliente SQL)
```

### 2. Abordagem Recomendada (Expand and Contract)

Criar uma nova migration que desfaz as mudanças:

```bash
# 1. Modifique o schema.prisma para reverter as mudanças
# 2. Crie uma nova migration
npm run db:migrate -- --name revert_anterior_migration
```

## Exemplo de Rollback Manual

Para reverter a migration `20251107005006_init`:

1. Marque como revertida:
```bash
npm run db:migrate:resolve -- --rolled-back 20251107005006_init
```

2. Execute o SQL do `down.sql` manualmente:
```sql
DROP INDEX IF EXISTS "users_email_key";
DROP TABLE IF EXISTS "users";
```

## ⚠️ Importante

- **Nunca delete migrations** que já foram aplicadas em produção
- Sempre crie novas migrations para desfazer mudanças em produção
- Use `down.sql` apenas como documentação ou em desenvolvimento
- Em produção, siga a abordagem "expand and contract"

