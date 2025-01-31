import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { productService } from "./productService";

const prisma = new PrismaClient();

export const productController = {
  async create(req: Request, res: Response) {
    const { nome, descricao } = req.body;
    try {
      const produto = await productService.registerProduct(nome, descricao);
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const produto = await productService.getProductById(id);
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar produto" });
    }
  },

  async listProducts(req: Request, res: Response) {
    try {
      const produtos = await productService.getAllProducts();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const produto = await productService.updateProduct(id, req.body);
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const produto = await productService.deleteProduct(id);
      return res.status(204).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao excluir produto" });
    }
  },
};
