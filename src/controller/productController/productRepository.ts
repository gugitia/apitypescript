import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class productRepository {
  static async createProduct(nome: string, descricao: string) {
    const product = await prisma.produto.create({
      data: {
        nome,
        descricao,
      },
    });
  }

  static async getProductList() {
    return prisma.produto.findMany();
  }

  static async getProductById(id: string) {
    return prisma.produto.findUnique({
      where: { id },
    });
  }

  static async updateProduct(id: string, data: any) {
    return prisma.produto.update({
      where: { id },
      data,
    });
  }

  static async deleteProduct(id: string) {
    return prisma.produto.delete({
      where: { id },
    });
  }
}
