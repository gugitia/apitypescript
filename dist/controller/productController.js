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
exports.productController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.productController = {
    getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const produto = yield prisma.produto.findUnique({
                    where: { id },
                });
                if (!produto) {
                    return response.status(404).json({ error: "Produto não encontrado" });
                }
                return response.status(200).json(produto);
            }
            catch (error) {
                console.error("Erro ao buscar produto:", error);
                return response.status(500).json({ error: "Erro ao buscar produto" });
            }
        });
    },
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const produtos = yield prisma.produto.findMany();
                return response.status(200).json(produtos);
            }
            catch (error) {
                console.error("Erro ao listar produtos:", error);
                return response.status(500).json({ error: "Erro ao listar produtos" });
            }
        });
    },
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, descricao } = request.body;
            try {
                const produto = yield prisma.produto.create({
                    data: {
                        nome,
                        descricao,
                    },
                });
                return response.status(201).json(produto);
            }
            catch (error) {
                console.error("Erro ao criar produto:", error);
                return response.status(500).json({ error: "Erro ao criar produto" });
            }
        });
    },
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { nome, descricao } = request.body;
            try {
                const produto = yield prisma.produto.update({
                    where: { id },
                    data: { nome, descricao },
                });
                return response.status(200).json(produto);
            }
            catch (error) {
                console.error("Erro ao atualizar produto:", error);
                return response.status(500).json({ error: "Erro ao atualizar produto" });
            }
        });
    },
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                yield prisma.produto.delete({
                    where: { id },
                });
                return response.status(204).send();
            }
            catch (error) {
                console.error("Erro ao excluir produto:", error);
                return response.status(500).json({ error: "Erro ao excluir produto" });
            }
        });
    },
};
