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
const user_1 = __importDefault(require("../models/user"));
class UserService {
    constructor() {
        /**
         * Create a new user with hashed password
         * @param body - User data including the password
         * @returns The created user instance
         */
        this.newUser = (body) => __awaiter(this, void 0, void 0, function* () {
            // Validate password length before hashing
            if (body.password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
            // Create a new user with the hashed password
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
        /**
         * Authenticate a user by comparing provided password with the stored hash
         * @param email - User's email
         * @param password - Provided password
         * @returns The user instance if authentication is successful
         */
        this.loginUser = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ where: { email } });
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }
            // Return a simplified user object
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
        });
        /**
         * Get all users
         * @returns Array of user instances
         */
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findAll();
            }
            catch (error) {
                console.error('Error fetching users:', error);
                throw new Error('Error fetching users');
            }
        });
        /**
         * Get a single user by ID
         * @param id - User's ID
         * @returns The user instance or null if not found
         */
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findByPk(id);
            }
            catch (error) {
                console.error('Error fetching user:', error);
                throw new Error('Error fetching user');
            }
        });
        /**
         * Update user details
         * @param id - User's ID
         * @param userData - Updated user data
         * @returns The updated user instance or null if not found
         */
        this.updateUser = (id, userData) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the user by ID
                const user = yield user_1.default.findByPk(id);
                if (user) {
                    // Update the user with the provided data
                    yield user.update(userData);
                    return user;
                }
                return null;
            }
            catch (error) {
                console.error('Error updating user:', error);
                throw new Error('Error updating user');
            }
        });
        /**
         * Delete a user by ID
         * @param id - User's ID
         */
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findByPk(id);
                if (user) {
                    yield user.destroy();
                }
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw new Error('Error deleting user');
            }
        });
    }
}
exports.default = UserService;
