import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.user.deleteMany();

  // Criar usuários de exemplo
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'João Silva',
        email: 'joao@email.com',
        age: 25,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Maria Santos',
        email: 'maria@email.com',
        age: 30,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Pedro Costa',
        email: 'pedro@email.com',
        age: 28,
      },
    }),
  ]);

  console.log('✅ Seed concluído!');
  console.log('Usuários criados:', users.length);
  
  for (const user of users) {
    console.log(`- ${user.name} (${user.email})`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
