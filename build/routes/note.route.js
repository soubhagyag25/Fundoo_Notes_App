"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* src>routes>note.route.ts */
const express_1 = __importDefault(require("express"));
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class NoteRoutes {
    constructor() {
        this.NoteController = new note_controller_1.default();
        this.router = express_1.default.Router();
        this.routes = () => {
            // Route to create a new note (Auth required)
            this.router.post('/create', auth_middleware_1.userAuth, (req, res, next) => {
                console.log('Create note route hit');
                next();
            }, this.NoteController.createNote);
            //   // Route to get all notes (Auth required)
            //   this.router.get('/', userAuth, this.NoteController.getAllNotes);
            //   // Route to get a single note by ID (Auth required)
            //   this.router.get('/:noteId', userAuth, this.NoteController.getNoteById);
            //   // Route to update a note (Auth required)
            //   this.router.put('/:noteId', userAuth, this.NoteController.updateNote);
            //   // Route to move a note to trash (Auth required)
            //   this.router.delete('/:noteId', userAuth, this.NoteController.deleteNote);
            //   // Route to archive a note (Auth required)
            //   this.router.post('/:noteId/archive', userAuth, this.NoteController.archiveNote);
        };
        this.getRoutes = () => {
            return this.router;
        };
        this.routes();
    }
}
exports.default = NoteRoutes;
