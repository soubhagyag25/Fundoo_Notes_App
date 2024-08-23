"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src>models>user.route.ts
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
//import { userAuth } from '../middlewares/auth.middleware';
class UserRoutes {
    constructor() {
        this.UserController = new user_controller_1.default();
        this.router = express_1.default.Router();
        this.routes = () => {
            // Route to check if the API is working (No auth required)
            this.router.get('/create', (req, res) => {
                res.status(200).json({
                    code: 200,
                    message: 'API is correctly working and ready to post'
                });
            });
            // Define a path for this route
            this.router.get('/all', this.UserController.getAllUsers);
            // Route to create a new user (Auth required)
            this.router.post('/create', this.UserController.newUser);
            // Route to get a single user by their ID (No auth required)
            this.router.get('/:id', this.UserController.getUser);
            // Route to update a user by their ID (Auth required)
            this.router.put('/:id', this.UserController.updateUser);
            // Route to delete a user by their ID (Auth required)
            this.router.delete('/:id', this.UserController.deleteUser);
            // Route for user login
            this.router.post('/login', this.UserController.loginUser);
        };
        this.getRoutes = () => {
            return this.router;
        };
        this.routes();
    }
}
exports.default = UserRoutes;
