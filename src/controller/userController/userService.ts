import { userRepository } from "./userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "chave_secreta";

export class userService {
  static async registerUser(nome: string, email: string, senha: string) {
    const existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error("Usuario já cadastrado");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const user = await userRepository.createUser(nome, email, hashedPassword);

    return user;
  }

  static async getAllUsers() {
    return userRepository.getUsersList();
  }

  static async getUserById(id: string) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("Usuario não encontrado");
    }
    return user;
  }

  static async login(email: string, senha: string) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("Email Invalido");
    }
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      throw new Error("Senha Invalido");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return { token, user };
  }
}
