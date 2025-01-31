"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class userRepository {
    static createUser(nome, email, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield prisma.cliente.create({
                data: {
                    nome,
                    email,
                    senha: hashedPassword,
                },
            });
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.cliente.findUnique({
                where: { email },
            });
        });
    }
    static getUsersList() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.cliente.findMany();
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.cliente.findUnique({
                where: { id },
            });
        });
    }
}
exports.userRepository = userRepository;
