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
const productService_1 = require("./productService");
const prisma = new client_1.PrismaClient();
exports.productController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, descricao } = req.body;
            try {
                const produto = yield productService_1.productService.registerProduct(nome, descricao);
                return res.status(200).json(produto);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao criar produto" });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const produto = yield productService_1.productService.getProductById(id);
                if (!produto) {
                    return res.status(404).json({ error: "Produto não encontrado" });
                }
                return res.status(200).json(produto);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao buscar produto" });
            }
        });
    },
    listProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const produtos = yield productService_1.productService.getAllProducts();
                return res.status(200).json(produtos);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao listar produtos" });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const produto = yield productService_1.productService.updateProduct(id, req.body);
                return res.status(200).json(produto);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao atualizar produto" });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const produto = yield productService_1.productService.deleteProduct(id);
                return res.status(204).json({ message: "Produto deletado com sucesso" });
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao excluir produto" });
            }
        });
    },
};
