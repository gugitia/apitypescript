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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
exports.userController = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            try {
                const cliente = yield prisma.cliente.findUnique({
                    where: { email },
                });
                if (!cliente) {
                    return res.status(404).json({ error: "E-mail inválido" });
                }
                const isPasswordValid = yield bcrypt_1.default.compare(senha, cliente.senha);
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
            }
            catch (error) {
                console.error("Erro ao fazer login:", error);
                return res.status(500).json({ error: "Erro ao fazer login" });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const cliente = yield prisma.cliente.findUnique({
                    where: { id },
                });
                if (!cliente) {
                    return res.status(404).json({ error: "Cliente não encontrado" });
                }
                return res.status(200).json(cliente);
            }
            catch (error) {
                console.error("Erro ao buscar cliente:", error);
                return res.status(500).json({ error: "Erro ao buscar cliente" });
            }
        });
    },
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientes = yield prisma.cliente.findMany();
                return res.json(clientes);
            }
            catch (error) {
                console.error("Erro ao listar clientes:", error);
                return res.status(500).json({ error: "Erro ao listar clientes" });
            }
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome: nome, email: email, senha: senha } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(senha, 10);
            try {
                const cliente = yield prisma.cliente.create({
                    data: {
                        nome,
                        email,
                        senha: hashedPassword,
                    },
                });
                return res.status(201).json(cliente);
            }
            catch (error) {
                console.error("Erro ao criar cliente:", error);
                return res.status(500).json({ error: "Erro ao criar cliente" });
            }
        });
    },
};
