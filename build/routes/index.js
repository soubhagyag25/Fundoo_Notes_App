"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src>routes>index.ts
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const note_route_1 = __importDefault(require("./note.route")); // Import NoteRoutes
const router = express_1.default.Router();
router.use(express_1.default.json());
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
    router.get('/home', (req, res) => {
        res.json('Welcome');
    });
    router.use('/users', new user_route_1.default().getRoutes());
    router.use('/notes', new note_route_1.default().getRoutes());
    return router;
};
exports.default = routes;
