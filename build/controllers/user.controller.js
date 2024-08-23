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
//src>controllers>user.controller.ts
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = __importDefault(require("../services/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor() {
        this.UserService = new user_service_1.default();
        //creating a new user
        this.newUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received body:', req.body); // Log received body
                const { email, password } = req.body;
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        code: http_status_codes_1.default.BAD_REQUEST,
                        message: 'Invalid email format',
                    });
                }
                // Validate password length
                if (password.length < 8) {
                    return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        code: http_status_codes_1.default.BAD_REQUEST,
                        message: 'Password must be at least 8 characters long',
                    });
                }
                // Proceed with user creation
                const data = yield this.UserService.newUser(req.body);
                res.status(http_status_codes_1.default.CREATED).json({
                    code: http_status_codes_1.default.CREATED,
                    data: data,
                    message: 'User created successfully',
                });
            }
            catch (error) {
                console.error('Error during user creation:', error); // Log any errors
                next(error);
            }
        });
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.getAllUsers();
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: data,
                    message: 'All users fetched successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const data = yield this.UserService.getUser(userId);
                if (!data) {
                    return res.status(http_status_codes_1.default.NOT_FOUND).json({
                        code: http_status_codes_1.default.NOT_FOUND,
                        message: 'User not found'
                    });
                }
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: data,
                    message: 'User fetched successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.updateUser(req.params.id, req.body);
                res.status(http_status_codes_1.default.ACCEPTED).json({
                    code: http_status_codes_1.default.ACCEPTED,
                    data: data,
                    message: 'User updated successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.UserService.deleteUser(req.params.id);
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: {},
                    message: 'User deleted successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Login User
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.UserService.loginUser(email, password);
                // Generate JWT token
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY || 'yourSecretKey', { expiresIn: '1h' });
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: {
                        user,
                        token
                    },
                    message: 'Login successful'
                });
            }
            catch (error) {
                res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                    code: http_status_codes_1.default.UNAUTHORIZED,
                    message: error.message,
                });
            }
        });
    }
}
exports.default = UserController;
