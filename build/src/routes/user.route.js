"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src>models>user.route.ts
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class UserRoutes {
    constructor() {
        this.UserController = new user_controller_1.default();
        this.router = express_1.default.Router();
        this.routes = () => {
            //! Route to Sign Up for a new USER
            this.router.post('/signup', this.UserController.SignUp);
            //! Route for user login
            this.router.post('/login', this.UserController.loginUser);
            //! Forget Password Route
            this.router.post('/forget-password', this.UserController.forgetPassword);
            //! Reset Password with Login Token Route
            this.router.post('/reset-password', auth_middleware_1.ResetAuth, this.UserController.resetPasswordWithToken);
        };
        this.getRoutes = () => {
            return this.router;
        };
        this.routes();
    }
}
exports.default = UserRoutes;
