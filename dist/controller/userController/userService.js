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
exports.userService = void 0;
const userRepository_1 = require("./userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "chave_secreta";
class userService {
    static registerUser(nome, email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userRepository_1.userRepository.getUserByEmail(email);
            if (existingUser) {
                throw new Error("Usuario já cadastrado");
            }
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(senha, saltRounds);
            const user = yield userRepository_1.userRepository.createUser(nome, email, hashedPassword);
            return user;
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.userRepository.getUsersList();
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.userRepository.getUserById(id);
            if (!user) {
                throw new Error("Usuario não encontrado");
            }
            return user;
        });
    }
    static login(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.userRepository.getUserByEmail(email);
            if (!user) {
                throw new Error("Email Invalido");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(senha, user.senha);
            if (!isPasswordValid) {
                throw new Error("Senha Invalido");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, SECRET_KEY, {
                expiresIn: "1h",
            });
            return { token, user };
        });
    }
}
exports.userService = userService;
