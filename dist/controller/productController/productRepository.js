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
exports.productRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class productRepository {
    static createProduct(nome, descricao) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.produto.create({
                data: {
                    nome,
                    descricao,
                },
            });
        });
    }
    static getProductList() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.produto.findMany();
        });
    }
    static getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.produto.findUnique({
                where: { id },
            });
        });
    }
    static updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.produto.update({
                where: { id },
                data,
            });
        });
    }
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.produto.delete({
                where: { id },
            });
        });
    }
}
exports.productRepository = productRepository;
