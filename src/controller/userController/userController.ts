import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { userService } from "./userService";

const prisma = new PrismaClient();

export class userController {
  static async register(req: Request, res: Response) {
    try {
      const { nome: nome, email: email, senha: senha } = req.body;
      const user = await userService.registerUser(nome, email, senha);

      return res
        .status(200)
        .json({ message: "Usuario cadastrado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar clientes" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      return res.status(500).json({ error: "Erro ao buscar cliente" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const result = await userService.login(email, senha);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}
