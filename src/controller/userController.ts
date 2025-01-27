import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userController = {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const clientes = await prisma.cliente.findMany(); 
      return res.json(clientes);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      return res.status(500).json({ error: "Erro ao listar clientes" });
    }
  },

  async create(req: Request, res: Response): Promise<Response> {
    const { u_Nome: nome, u_Email: email, u_Senha: senha } = req.body;

    try {
      const cliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          senha,
        },
      });

      return res.status(201).json(cliente);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return res.status(500).json({ error: "Erro ao criar cliente" });
    }
  },
};
