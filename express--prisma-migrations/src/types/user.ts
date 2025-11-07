import { z } from 'zod';

// Schema de validação para criação de usuário
export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  age: z.number().min(0, 'Idade deve ser maior ou igual a 0').max(150, 'Idade deve ser menor ou igual a 150'),
});

// Schema de validação para atualização de usuário
export const UpdateUserSchema = CreateUserSchema.partial();

// Tipos TypeScript derivados dos schemas
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;

// Tipo do usuário (será gerado pelo Prisma)
export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
};
