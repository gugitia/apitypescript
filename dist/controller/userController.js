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
const prisma = new client_1.PrismaClient();
exports.userController = {
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
            const { u_Nome: nome, u_Email: email, u_Senha: senha } = req.body;
            try {
                const cliente = yield prisma.cliente.create({
                    data: {
                        nome,
                        email,
                        senha,
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
