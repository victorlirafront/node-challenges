import { exec } from 'child_process';
import { promisify } from 'util';
import app from './app';
import { PrismaClient } from '@prisma/client';

const execAsync = promisify(exec);
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3002;

// Função para executar migrations
async function runMigrations() {
  try {
    console.log('🔄 Executando migrations pendentes...');
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    if (stdout) console.log(stdout);
    if (stderr && !stderr.includes('warning')) {
      console.warn(stderr);
    }
    console.log('✅ Migrations verificadas e aplicadas com sucesso!');
  } catch (error: any) {
    // Se não houver migrations para aplicar, não é um erro crítico
    if (error.message && error.message.includes('No pending migrations')) {
      console.log('ℹ️  Nenhuma migration pendente');
    } else {
      console.error('❌ Erro ao executar migrations:', error.message);
      // Em produção, pode ser crítico bloquear o servidor
      if (process.env.NODE_ENV === 'production') {
        console.error('🚨 Erro crítico em produção. Encerrando...');
        process.exit(1);
      } else {
        console.warn('⚠️  Continuando mesmo com erro nas migrations (modo desenvolvimento)');
      }
    }
  }
}

// Função para inicializar o servidor
async function startServer() {
  // Executar migrations antes de iniciar o servidor
  await runMigrations();

  // Verificar conexão com o banco
  try {
    await prisma.$connect();
    console.log('✅ Conectado ao banco de dados');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor Prisma rodando na porta ${PORT}`);
    console.log(`📖 Documentação da API: http://localhost:${PORT}`);
    console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`👥 Endpoints de usuários: http://localhost:${PORT}/api/users`);
    console.log(`🗄️ Prisma Studio: http://localhost:5555`);
  });
}

// Tratamento de encerramento graceful
process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Encerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
