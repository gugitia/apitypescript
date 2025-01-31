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
exports.userController = void 0;
const client_1 = require("@prisma/client");
const userService_1 = require("./userService");
const prisma = new client_1.PrismaClient();
class userController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome: nome, email: email, senha: senha } = req.body;
                const user = yield userService_1.userService.registerUser(nome, email, senha);
                return res
                    .status(200)
                    .json({ message: "Usuario cadastrado com sucesso" });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.userService.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao listar clientes" });
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield userService_1.userService.getUserById(id);
                if (!user) {
                    return res.status(404).json({ error: "Cliente não encontrado" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                console.error("Erro ao buscar cliente:", error);
                return res.status(500).json({ error: "Erro ao buscar cliente" });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            try {
                const result = yield userService_1.userService.login(email, senha);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao fazer login" });
            }
        });
    }
}
exports.userController = userController;
