import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const userController = {
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { email },
      });
      if (!cliente) {
        return res.status(404).json({ error: "E-mail inválido" });
      }
      const isPasswordValid = await bcrypt.compare(senha, cliente.senha);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida" });
      }
      return res.status(200).json({
        message: "Login realizado com sucesso",
        cliente: {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email,
        },
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ error: "Erro ao fazer login" });
    }
  },
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id },
      });
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
      return res.status(200).json(cliente);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      return res.status(500).json({ error: "Erro ao buscar cliente" });
    }
  },
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
    const { nome: nome, email: email, senha: senha } = req.body;

    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
      const cliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
        },
      });

      return res.status(201).json(cliente);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return res.status(500).json({ error: "Erro ao criar cliente" });
    }
  },
};
