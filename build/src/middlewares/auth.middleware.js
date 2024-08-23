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
exports.ResetAuth = exports.userAuth = void 0;
/* src>middlewares>auth.middleware.ts */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bearerToken = req.header('Authorization');
        if (!bearerToken) {
            throw {
                code: http_status_codes_1.default.BAD_REQUEST,
                message: 'Authorization token is required',
            };
        }
        bearerToken = bearerToken.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.JWT_SECRET_KEY || 'yourSecretKey');
        // Store userId in req.user
        req.user = { id: decodedToken.id };
        next();
    }
    catch (error) {
        res.status(http_status_codes_1.default.UNAUTHORIZED).json({
            code: http_status_codes_1.default.UNAUTHORIZED,
            message: 'Unauthorized',
        });
    }
});
exports.userAuth = userAuth;
const ResetAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bearerToken = req.header('Authorization');
        if (!bearerToken) {
            throw {
                code: http_status_codes_1.default.BAD_REQUEST,
                message: 'Authorization token is required',
            };
        }
        bearerToken = bearerToken.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.RESET_SECRET_KEY);
        // Store userId in req.user
        req.user = { id: decodedToken.id };
        next();
    }
    catch (error) {
        res.status(http_status_codes_1.default.UNAUTHORIZED).json({
            code: http_status_codes_1.default.UNAUTHORIZED,
            message: 'Unauthorized',
        });
    }
});
exports.ResetAuth = ResetAuth;
