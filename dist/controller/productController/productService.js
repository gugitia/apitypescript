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
exports.productService = void 0;
const productRepository_1 = require("./productRepository");
class productService {
    static registerProduct(nome, descricao) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productRepository_1.productRepository.createProduct(nome, descricao);
            return product;
        });
    }
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return productRepository_1.productRepository.getProductList();
        });
    }
    static getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield productRepository_1.productRepository.getProductById(id);
            if (!user) {
                throw new Error("Produto não encontrado");
            }
            return user;
        });
    }
    static updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const productExist = yield productRepository_1.productRepository.getProductById(id);
            if (!productExist) {
                throw new Error("Produto não encontrado");
            }
            return productRepository_1.productRepository.updateProduct(id, data);
        });
    }
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productExist = yield productRepository_1.productRepository.getProductById(id);
            if (!productExist) {
                throw new Error("Produto não encontrado");
            }
            return productRepository_1.productRepository.deleteProduct(id);
        });
    }
}
exports.productService = productService;
