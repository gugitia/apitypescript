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
exports.OrderController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.OrderController = {
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield prisma.pedido.findMany({
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
            }
            catch (error) {
                console.error("Erro ao listar pedidos:", error);
                return response.status(500).json({ error: "Erro ao listar pedidos" });
            }
        });
    },
    getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const order = yield prisma.pedido.findUnique({
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
            }
            catch (error) {
                console.error("Erro ao buscar pedido:", error);
                return response.status(500).json({ error: "Erro ao buscar pedido" });
            }
        });
    },
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clienteId, produtos } = request.body;
            try {
                const order = yield prisma.pedido.create({
                    data: {
                        clienteId,
                        itensPedido: {
                            create: produtos.map((item) => ({
                                produtoId: item.produtoId,
                                quantidade: item.quantidade,
                            })),
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
            }
            catch (error) {
                console.error("Erro ao criar pedido:", error);
                return response.status(500).json({ error: "Erro ao criar pedido" });
            }
        });
    },
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { produtos } = request.body; // produtos será um array de objetos { produtoId, quantidade }
            try {
                // Primeiro, deletamos os itens relacionados ao pedido para recriá-los
                yield prisma.itemPedido.deleteMany({
                    where: { ordemId: id },
                });
                // Atualizamos o pedido e recriamos os itens
                const updatedOrder = yield prisma.pedido.update({
                    where: { id },
                    data: {
                        itensPedido: {
                            create: produtos.map((item) => ({
                                produtoId: item.produtoId,
                                quantidade: item.quantidade,
                            })),
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
            }
            catch (error) {
                console.error("Erro ao atualizar pedido:", error);
                return response.status(500).json({ error: "Erro ao atualizar pedido" });
            }
        });
    },
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                yield prisma.pedido.delete({
                    where: { id },
                });
                return response.status(204).send(); // Retorna sem conteúdo
            }
            catch (error) {
                console.error("Erro ao excluir pedido:", error);
                return response.status(500).json({ error: "Erro ao excluir pedido" });
            }
        });
    },
};
