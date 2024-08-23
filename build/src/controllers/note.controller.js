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
const note_service_1 = __importDefault(require("../services/note.service"));
class NoteController {
    constructor() {
        this.noteService = new note_service_1.default();
        //! Creating a New Note
        this.createNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { title, description } = req.body; //We need to pass title and description in the Body
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Access user ID from middleware
            if (!title || !description || !userId) {
                return res.status(400).json({ message: 'Title, description, and user ID are required' });
            }
            try {
                // Create a new note with the correct field names
                const newNote = yield this.noteService.createNote({
                    title,
                    description,
                    CreatedBy: userId,
                });
                res.status(201).json(newNote);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating note', error });
            }
        });
        //! TO ARCHIVE A NOTE
        this.archiveNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const noteId = parseInt(req.params.noteId, 10);
                if (isNaN(noteId)) {
                    return res.status(400).json({ message: 'Invalid note ID' });
                }
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const updatedNote = yield this.noteService.archiveNote(noteId, userId);
                if (!updatedNote) {
                    return res.status(404).json({ message: 'Note not found or not authorized' });
                }
                res.status(200).json({ message: 'Note archived successfully', data: updatedNote });
            }
            catch (error) {
                console.error('Error archiving note:', error);
                res.status(500).json({ code: 500, message: 'Error archiving note' });
                next(error);
            }
        });
        //! Move note to trash
        this.moveToTrash = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const noteId = parseInt(req.params.noteId, 10);
                if (isNaN(noteId)) {
                    return res.status(400).json({ message: 'Invalid note ID' });
                }
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const updatedNote = yield this.noteService.moveToTrash(noteId, userId);
                if (!updatedNote) {
                    return res.status(404).json({ message: 'Note not found or not authorized' });
                }
                res.status(200).json({ message: 'Note moved to trash successfully', data: updatedNote });
            }
            catch (error) {
                console.error('Error moving note to trash:', error);
                res.status(500).json({ code: 500, message: 'Error moving note to trash' });
                next(error);
            }
        });
        //! Permanently delete note from trash
        this.deleteFromTrash = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const noteId = parseInt(req.params.noteId, 10);
                if (isNaN(noteId)) {
                    return res.status(400).json({ message: 'Invalid note ID' });
                }
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const success = yield this.noteService.deleteFromTrash(noteId, userId);
                if (!success) {
                    return res.status(404).json({ message: 'Note not found or not in trash' });
                }
                res.status(200).json({ message: 'Note deleted successfully' });
            }
            catch (error) {
                console.error('Error deleting note from trash:', error);
                res.status(500).json({ code: 500, message: 'Error deleting note from trash' });
                next(error);
            }
        });
        //! Restore note from trash
        this.restoreFromTrash = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const noteId = parseInt(req.params.noteId, 10);
                if (isNaN(noteId)) {
                    return res.status(400).json({ message: 'Invalid note ID' });
                }
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const updatedNote = yield this.noteService.restoreFromTrash(noteId, userId);
                if (!updatedNote) {
                    return res.status(404).json({ message: 'Note not found or not in trash' });
                }
                res.status(200).json({ message: 'Note restored successfully', data: updatedNote });
            }
            catch (error) {
                console.error('Error restoring note from trash:', error);
                res.status(500).json({ code: 500, message: 'Error restoring note from trash' });
                next(error);
            }
        });
        //! To UNARCHIVE an Archived Note
        this.unarchiveNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const noteId = parseInt(req.params.noteId, 10);
                if (isNaN(noteId)) {
                    return res.status(400).json({ message: 'Invalid note ID' });
                }
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const updatedNote = yield this.noteService.unarchiveNote(noteId, userId);
                if (!updatedNote) {
                    return res.status(404).json({ message: 'Note not found, not authorized, or in trash' });
                }
                res.status(200).json({ message: 'Note unarchived successfully', data: updatedNote });
            }
            catch (error) {
                console.error('Error unarchiving note:', error);
                res.status(500).json({ code: 500, message: 'Error unarchiving note' });
                next(error);
            }
        });
        //! Get all unarchived and non-trashed notes for a user
        this.getAllNotes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id; // Assuming req.user contains the authenticated user's details
                const notes = yield this.noteService.getAllNotes(userId);
                res.status(200).json({ success: true, notes });
            }
            catch (error) {
                console.error('Error getting all notes:', error);
                res.status(500).json({ success: false, message: 'Error getting all notes' });
            }
        });
        //! Get all archived notes
        this.getArchivedNotes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const archivedNotes = yield this.noteService.getArchivedNotes(userId);
                res.status(200).json({ success: true, notes: archivedNotes });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Failed to retrieve archived notes' });
            }
        });
        //! Get all trashed notes
        this.getTrashedNotes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const trashedNotes = yield this.noteService.getTrashedNotes(userId);
                res.status(200).json({ success: true, notes: trashedNotes });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Failed to retrieve trashed notes' });
            }
        });
    }
}
exports.default = NoteController;
