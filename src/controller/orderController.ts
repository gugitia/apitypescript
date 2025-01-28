import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const OrderController = {
  async list(request: Request, response: Response) {
    try {
      const orders = await prisma.pedido.findMany({
        include: {
          cliente: true,
          itensPedido: {
            include: {
              produto: true,
            },
          },
        },
      });

      return response.status(200).json(orders);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      return response.status(500).json({ error: "Erro ao listar pedidos" });
    }
  },
  async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const order = await prisma.pedido.findUnique({
        where: { id },
        include: {
          cliente: true,
          itensPedido: {
            include: {
              produto: true,
            },
          },
        },
      });

      if (!order) {
        return response.status(404).json({ error: "Pedido não encontrado" });
      }

      return response.status(200).json(order);
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
      return response.status(500).json({ error: "Erro ao buscar pedido" });
    }
  },

  async create(request: Request, response: Response) {
    const { clienteId, produtos } = request.body;

    try {
      const order = await prisma.pedido.create({
        data: {
          clienteId,
          itensPedido: {
            create: produtos.map(
              (item: { produtoId: string; quantidade: number }) => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade,
              })
            ),
          },
        },
        include: {
          cliente: true,
          itensPedido: {
            include: {
              produto: true,
            },
          },
        },
      });

      return response.status(201).json(order);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return response.status(500).json({ error: "Erro ao criar pedido" });
    }
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { produtos } = request.body; // produtos será um array de objetos { produtoId, quantidade }

    try {
      // Primeiro, deletamos os itens relacionados ao pedido para recriá-los
      await prisma.itemPedido.deleteMany({
        where: { ordemId: id },
      });

      // Atualizamos o pedido e recriamos os itens
      const updatedOrder = await prisma.pedido.update({
        where: { id },
        data: {
          itensPedido: {
            create: produtos.map(
              (item: { produtoId: string; quantidade: number }) => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade,
              })
            ),
          },
        },
        include: {
          cliente: true,
          itensPedido: {
            include: {
              produto: true,
            },
          },
        },
      });

      return response.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      return response.status(500).json({ error: "Erro ao atualizar pedido" });
    }
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await prisma.pedido.delete({
        where: { id },
      });

      return response.status(204).send(); // Retorna sem conteúdo
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      return response.status(500).json({ error: "Erro ao excluir pedido" });
    }
  },
};
