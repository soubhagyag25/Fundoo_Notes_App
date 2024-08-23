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
//src>services>note.service.ts
const note_model_1 = __importDefault(require("../models/note.model"));
class NoteService {
    constructor() {
        //! Create a new note
        this.createNote = (noteData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_model_1.default.create(noteData);
                return note;
            }
            catch (error) {
                console.error('Error creating note:', error);
                throw new Error('Error creating note');
            }
        });
        //! Archive a note by ID and user ID
        this.archiveNote = (noteId, CreatedBy) => __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_model_1.default.findOne({ where: { id: noteId, CreatedBy } });
                if (note) {
                    if (note.isInTrash) {
                        throw new Error('Note is in trash and cannot be archived');
                    }
                    note.isArchived = true;
                    yield note.save();
                    return note;
                }
                else {
                    console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${CreatedBy}`);
                    return null;
                }
            }
            catch (error) {
                console.error(`Error archiving note for noteId: ${noteId}, userId: ${CreatedBy}`, error);
                throw new Error('Error archiving note');
            }
        });
        //! Move a note to trash
        this.moveToTrash = (noteId, CreatedBy) => __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_model_1.default.findOne({ where: { id: noteId, CreatedBy } });
                if (note) {
                    note.isInTrash = true;
                    note.isArchived = false; // Now here if the Note was in Archive,it will go to trash and isArchived becomes False
                    yield note.save();
                    return note;
                }
                else {
                    console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${CreatedBy}`);
                    return null;
                }
            }
            catch (error) {
                console.error(`Error moving note to trash for noteId: ${noteId}, userId: ${CreatedBy}`, error);
                throw new Error('Error moving note to trash');
            }
        });
        //! Permanently delete a note from trash
        this.deleteFromTrash = (noteId, CreatedBy) => __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_model_1.default.findOne({ where: { id: noteId, CreatedBy, isInTrash: true } });
                if (note) {
                    yield note.destroy();
                    return true;
                }
                else {
                    console.warn(`Note not found or not in trash: noteId=${noteId}, userId=${CreatedBy}`);
                    return false;
                }
            }
            catch (error) {
                console.error(`Error deleting note from trash for noteId: ${noteId}, userId: ${CreatedBy}`, error);
                throw new Error('Error deleting note from trash');
            }
        });
        //! Restore a note from trash
        this.restoreFromTrash = (noteId, CreatedBy) => __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_model_1.default.findOne({ where: { id: noteId, CreatedBy, isInTrash: true } });
                if (note) {
                    note.isInTrash = false;
                    yield note.save();
                    return note;
                }
                else {
                    console.warn(`Note not found or not in trash: noteId=${noteId}, userId=${CreatedBy}`);
                    return null;
                }
            }
            catch (error) {
                console.error(`Error restoring note from trash for noteId: ${noteId}, userId: ${CreatedBy}`, error);
                throw new Error('Error restoring note from trash');
            }
        });
        //! To UNARCHIVE an Archived note
        this.unarchiveNote = (noteId, CreatedBy) => __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_model_1.default.findOne({ where: { id: noteId, CreatedBy } });
                if (note) {
                    if (note.isInTrash) {
                        return null; // Cannot unarchive a note in trash
                    }
                    note.isArchived = false;
                    yield note.save();
                    return note;
                }
                else {
                    console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${CreatedBy}`);
                    return null;
                }
            }
            catch (error) {
                console.error(`Error unarchiving note for noteId: ${noteId}, userId: ${CreatedBy}`, error);
                throw new Error('Error unarchiving note');
            }
        });
        //! Get all unarchived and non-trashed notes for a user
        this.getAllNotes = (CreatedBy) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield note_model_1.default.findAll({
                    where: {
                        CreatedBy,
                        isArchived: false,
                        isInTrash: false,
                    },
                });
            }
            catch (error) {
                console.error('Error fetching notes:', error);
                throw new Error('Error fetching notes');
            }
        });
        //! Get all notes that are in archive
        this.getArchivedNotes = (CreatedBy) => __awaiter(this, void 0, void 0, function* () {
            try {
                const archivedNotes = yield note_model_1.default.findAll({ where: { CreatedBy, isArchived: true, isInTrash: false } });
                return archivedNotes;
            }
            catch (error) {
                console.error('Error fetching archived notes:', error);
                throw new Error('Error fetching archived notes');
            }
        });
        //! Get all notes that are in trash
        this.getTrashedNotes = (CreatedBy) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trashedNotes = yield note_model_1.default.findAll({ where: { CreatedBy, isInTrash: true } });
                return trashedNotes;
            }
            catch (error) {
                console.error('Error fetching trashed notes:', error);
                throw new Error('Error fetching trashed notes');
            }
        });
    }
}
exports.default = NoteService;
