import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productController = {
  async getById(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const produto = await prisma.produto.findUnique({
        where: { id },
      });

      if (!produto) {
        return response.status(404).json({ error: "Produto não encontrado" });
      }

      return response.status(200).json(produto);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return response.status(500).json({ error: "Erro ao buscar produto" });
    }
  },

  async list(request: Request, response: Response) {
    try {
      const produtos = await prisma.produto.findMany();
      return response.status(200).json(produtos);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      return response.status(500).json({ error: "Erro ao listar produtos" });
    }
  },

  async create(request: Request, response: Response) {
    const { nome, descricao } = request.body;

    try {
      const produto = await prisma.produto.create({
        data: {
          nome,
          descricao,
        },
      });

      return response.status(201).json(produto);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      return response.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, descricao } = request.body;

    try {
      const produto = await prisma.produto.update({
        where: { id },
        data: { nome, descricao },
      });

      return response.status(200).json(produto);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      return response.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await prisma.produto.delete({
        where: { id },
      });

      return response.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      return response.status(500).json({ error: "Erro ao excluir produto" });
    }
  },
};
