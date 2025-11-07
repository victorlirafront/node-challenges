import { Request, Response } from 'express';
import userService from '../services/userService';
import { CreateUserSchema, UpdateUserSchema } from '../types/user';

class UserController {
  // CREATE - POST /users
  async createUser(req: Request, res: Response) {
    try {
      // Validar dados de entrada
      const validationResult = CreateUserSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: validationResult.error.errors,
        });
      }

      const userData = validationResult.data;

      // Verificar se email já existe
      const existingUser = await userService.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email já está em uso',
        });
      }

      const newUser = await userService.createUser(userData);
      
      res.status(201).json({
        success: true,
        data: newUser,
        message: 'Usuário criado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // READ - GET /users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      
      res.status(200).json({
        success: true,
        data: users,
        count: users.length,
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // READ - GET /users/:id
  async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
      }

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // UPDATE - PUT /users/:id
  async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
      }

      // Validar dados de entrada
      const validationResult = UpdateUserSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: validationResult.error.errors,
        });
      }

      const userData = validationResult.data;

      // Verificar se o usuário existe
      const userExists = await userService.userExists(id);
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      // Se estiver atualizando o email, verificar se já existe
      if (userData.email) {
        const existingUser = await userService.getUserByEmail(userData.email);
        if (existingUser && existingUser.id !== id) {
          return res.status(409).json({
            success: false,
            message: 'Email já está em uso',
          });
        }
      }

      const updatedUser = await userService.updateUser(id, userData);
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'Usuário atualizado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // DELETE - DELETE /users/:id
  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
      }

      // Verificar se o usuário existe
      const userExists = await userService.userExists(id);
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      await userService.deleteUser(id);

      res.status(200).json({
        success: true,
        message: 'Usuário deletado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}

export default new UserController();
