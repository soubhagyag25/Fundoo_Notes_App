"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src>routes>note.routes.ts
const express_1 = __importDefault(require("express"));
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class NoteRoutes {
    constructor() {
        this.noteController = new note_controller_1.default();
        this.router = express_1.default.Router();
        this.routes = () => {
            //! Route to CREATE a new note (Auth required)
            this.router.post('/create', auth_middleware_1.userAuth, this.noteController.createNote);
            //! Route to archive a note (Auth required)
            this.router.post('/:noteId/archive', auth_middleware_1.userAuth, this.noteController.archiveNote);
            //! Route to move a note to trash (Auth required)
            this.router.post('/:noteId/trash', auth_middleware_1.userAuth, this.noteController.moveToTrash);
            //! Route to permanently delete a note from trash (Auth required)
            this.router.delete('/:noteId/trash', auth_middleware_1.userAuth, this.noteController.deleteFromTrash);
            //! Route to restore a note from trash (Auth required)
            this.router.post('/:noteId/restore', auth_middleware_1.userAuth, this.noteController.restoreFromTrash);
            //! Route to unarchive a note (Auth required)
            this.router.post('/:noteId/unarchive', auth_middleware_1.userAuth, this.noteController.unarchiveNote);
            //! To Get all notes
            this.router.get('/all', auth_middleware_1.userAuth, this.noteController.getAllNotes);
            //! Route to get all archived notes (Auth required)
            this.router.get('/archived', auth_middleware_1.userAuth, this.noteController.getArchivedNotes);
            //! Route to get all trashed notes (Auth required)
            this.router.get('/trashed', auth_middleware_1.userAuth, this.noteController.getTrashedNotes);
        };
        this.getRoutes = () => {
            return this.router;
        };
        this.routes();
    }
}
exports.default = NoteRoutes;
