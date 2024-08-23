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
        //! Sign Up or creating a new user
        this.SignUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                const data = yield this.UserService.SignUp(req.body);
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
        //! Login User
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.UserService.loginUser(email, password);
                // Generate JWT token
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: user, message: 'Login successful'
                });
            }
            catch (error) {
                res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                    code: http_status_codes_1.default.UNAUTHORIZED,
                    message: error.message,
                });
            }
        });
        //! Forget Password 
        this.forgetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            // Check if user exists
            const user = yield this.UserService.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'Password reset token generated',
                Message2: 'Check your registered email'
            });
        });
        //! Reset Password Endpoint
        this.resetPasswordWithToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Extract token from the Authorization header
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(400).json({ message: 'Authorization header missing' });
            }
            // Assuming the format is "Bearer <token>"
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(400).json({ message: 'Token missing' });
            }
            const { newPassword } = req.body;
            try {
                // Verify the token
                const decoded = jsonwebtoken_1.default.verify(token, process.env.RESET_SECRET_KEY);
                // Update user's password
                yield this.UserService.updateUserPassword(decoded.id, newPassword);
                return res.status(200).json({ message: 'Password has been changed successfully' });
            }
            catch (error) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }
        });
    }
}
exports.default = UserController;
