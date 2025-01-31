import { productRepository } from "./productRepository";

export class productService {
  static async registerProduct(nome: string, descricao: string) {
    const product = await productRepository.createProduct(nome, descricao);
    return product;
  }
  static async getAllProducts() {
    return productRepository.getProductList();
  }

  static async getProductById(id: string) {
    const user = await productRepository.getProductById(id);
    if (!user) {
      throw new Error("Produto não encontrado");
    }
    return user;
  }

  static async updateProduct(id: string, data: any) {
    const productExist = await productRepository.getProductById(id);
    if (!productExist) {
      throw new Error("Produto não encontrado");
    }
    return productRepository.updateProduct(id, data);
  }

  static async deleteProduct(id: string) {
    const productExist = await productRepository.getProductById(id);
    if (!productExist) {
      throw new Error("Produto não encontrado");
    }
    return productRepository.deleteProduct(id);
  }
}
