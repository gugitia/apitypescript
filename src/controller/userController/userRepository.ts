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
}
