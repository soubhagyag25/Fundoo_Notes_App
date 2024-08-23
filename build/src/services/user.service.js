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
//src>services>user.service.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_2 = require("bcrypt");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EmailSender_1 = require("../utils/EmailSender");
class UserService {
    constructor() {
        //! Sign Up or Creating a new User
        this.SignUp = (body) => __awaiter(this, void 0, void 0, function* () {
            // Validate password length before hashing
            if (body.password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(body.password, saltRounds);
            // Creating a new user with the hashed password
            try {
                const user = yield user_1.default.create({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: hashedPassword
                });
                return user;
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw new Error('Error creating user');
            }
        });
        //! Login User
        this.loginUser = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ where: { email } });
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            // Return a simplified user object
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: token
            };
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findByPk(id);
            }
            catch (error) {
                console.error('Error fetching user:', error);
                throw new Error('Error fetching user');
            }
        });
        //!Finding a User by Email -------- Forget Password
        this.findUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ where: { email } }); // Find the user by email
            if (!user) {
                return null; //-->Returning Null if user does not exist
            }
            const reset_token = jsonwebtoken_1.default.sign(//-->Here we are generating a token if user exists
            { id: user.id }, process.env.RESET_SECRET_KEY, { expiresIn: '1h' });
            yield (0, EmailSender_1.sendEmail)(user.email, reset_token);
            return user;
        });
        //! Update user's password
        this.updateUserPassword = (userId, newPassword) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, bcrypt_2.hash)(newPassword, 10);
            return user_1.default.update({ password: hashedPassword }, { where: { id: userId } });
        });
    }
}
exports.default = UserService;
