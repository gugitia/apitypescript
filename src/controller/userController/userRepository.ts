import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class userRepository {
  static async createUser(nome: string, email: string, hashedPassword: string) {
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.cliente.findUnique({
      where: { email },
    });
  }

  static async getUsersList() {
    return prisma.cliente.findMany();
  }

  static async getUserById(id: string) {
    return prisma.cliente.findUnique({
      where: { id },
    });
  }
}
