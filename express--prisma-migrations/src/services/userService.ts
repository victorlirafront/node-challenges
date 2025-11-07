import { PrismaClient } from '@prisma/client';
import { CreateUserRequest, UpdateUserRequest } from '../types/user';

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // CREATE - Criar um novo usuário
  async createUser(userData: CreateUserRequest) {
    return await this.prisma.user.create({
      data: userData,
    });
  }

  // READ - Buscar todos os usuários
  async getAllUsers() {
    return await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // READ - Buscar usuário por ID
  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  // UPDATE - Atualizar usuário
  async updateUser(id: number, userData: UpdateUserRequest) {
    return await this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  // DELETE - Deletar usuário
  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  // Buscar usuário por email (para validação)
  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Verificar se usuário existe
  async userExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!user;
  }

  // Fechar conexão com o banco
  async disconnect() {
    await this.prisma.$disconnect();
  }
}

export default new UserService();
