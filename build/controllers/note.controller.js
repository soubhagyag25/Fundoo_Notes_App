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
        this.createNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { title, description, noteDetails } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Access user ID from middleware
            if (!title || !description || !userId) {
                return res.status(400).json({ message: 'Title, description, and user ID are required' });
            }
            try {
                // Create a new note with the correct field names
                const newNote = yield this.noteService.createNote({
                    title,
                    description,
                    noteDetails,
                    CreatedBy: userId,
                });
                res.status(201).json(newNote);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating note', error });
            }
        });
        // public getNoteById = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const noteId = parseInt(req.params.noteId, 10);
        //     if (isNaN(noteId)) {
        //       return res.status(400).json({ message: 'Invalid note ID' });
        //     }
        //     const userId = req.user?.id;
        //     if (!userId) {
        //       return res.status(401).json({ message: 'Unauthorized' });
        //     }
        //     const data = await this.noteService.getNoteById(noteId, userId);
        //     if (!data) {
        //       return res.status(404).json({ message: 'Note not found' });
        //     }
        //     res.status(200).json({ data });
        //   } catch (error) {
        //     console.error('Error fetching note by ID:', error);
        //     next(error);
        //   }
        // };
        // public getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const userId = req.user?.id;
        //     if (!userId) {
        //       return res.status(401).json({ message: 'Unauthorized' });
        //     }
        //     const data = await this.noteService.getAllNotes(userId);
        //     res.status(200).json({ data });
        //   } catch (error) {
        //     console.error('Error fetching all notes:', error);
        //     next(error);
        //   }
        // };
        // public updateNote = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const noteId = parseInt(req.params.noteId, 10);
        //     if (isNaN(noteId)) {
        //       return res.status(400).json({ message: 'Invalid note ID' });
        //     }
        //     const userId = req.user?.id;
        //     if (!userId) {
        //       return res.status(401).json({ message: 'Unauthorized' });
        //     }
        //     const updatedNote = await this.noteService.updateNote(noteId, userId, req.body);
        //     if (!updatedNote) {
        //       return res.status(404).json({ message: 'Note not found or not authorized' });
        //     }
        //     res.status(200).json({ message: 'Note updated successfully', data: updatedNote });
        //   } catch (error) {
        //     console.error('Error updating note:', error);
        //     next(error);
        //   }
        // };
        // public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const noteId = parseInt(req.params.noteId, 10);
        //     if (isNaN(noteId)) {
        //       return res.status(400).json({ message: 'Invalid note ID' });
        //     }
        //     const userId = req.user?.id;
        //     if (!userId) {
        //       return res.status(401).json({ message: 'Unauthorized' });
        //     }
        //     const isDeleted = await this.noteService.deleteNote(noteId, userId);
        //     if (!isDeleted) {
        //       return res.status(404).json({ message: 'Note not found or not authorized' });
        //     }
        //     res.status(200).json({ message: 'Note deleted successfully' });
        //   } catch (error) {
        //     console.error('Error deleting note:', error);
        //     next(error);
        //   }
        // };
        // public archiveNote = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const noteId = parseInt(req.params.noteId, 10);
        //     if (isNaN(noteId)) {
        //       return res.status(400).json({ message: 'Invalid note ID' });
        //     }
        //     const userId = req.user?.id;
        //     if (!userId) {
        //       return res.status(401).json({ message: 'Unauthorized' });
        //     }
        //     const updatedNote = await this.noteService.archiveNote(noteId, userId);
        //     if (!updatedNote) {
        //       return res.status(404).json({ message: 'Note not found or not authorized' });
        //     }
        //     res.status(200).json({ message: 'Note archived successfully', data: updatedNote });
        //   } catch (error) {
        //     console.error('Error archiving note:', error);
        //     next(error);
        //   }
        // };
    }
}
exports.default = NoteController;
