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
        // Create a new note
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
        // // Get a single note by ID
        // public getNoteById = async (noteId: number, userId: number) => {
        //   try {
        //     return await Note.findOne({ where: { id: noteId, userId } });
        //   } catch (error) {
        //     console.error('Error fetching note:', error);
        //     throw new Error('Error fetching note');
        //   }
        // };
        // // Get all notes for a user
        // public getAllNotes = async (userId: number) => {
        //   try {
        //     return await Note.findAll({ where: { userId } });
        //   } catch (error) {
        //     console.error('Error fetching notes:', error);
        //     throw new Error('Error fetching notes');
        //   }
        // };
        // // Update a note by ID
        // public updateNote = async (noteId: number, userId: number, noteData: any) => {
        //   try {
        //     const note = await Note.findOne({ where: { id: noteId, userId } });
        //     if (note) {
        //       await note.update(noteData);
        //       return note;
        //     }
        //     return null;
        //   } catch (error) {
        //     console.error('Error updating note:', error);
        //     throw new Error('Error updating note');
        //   }
        // };
        // // Delete a note by ID
        // public deleteNote = async (noteId: number, userId: number) => {
        //   try {
        //     const note = await Note.findOne({ where: { id: noteId, userId } });
        //     if (note) {
        //       await note.destroy();
        //       return true;
        //     }
        //     return false;
        //   } catch (error) {
        //     console.error('Error deleting note:', error);
        //     throw new Error('Error deleting note');
        //   }
        // };
        // // Archive a note by ID
        // public archiveNote = async (noteId: number, userId: number) => {
        //   try {
        //     const note = await Note.findOne({ where: { id: noteId, userId } });
        //     if (note) {
        //       note.isArchived = true;
        //       await note.save();
        //       return note;
        //     }
        //     return null;
        //   } catch (error) {
        //     console.error('Error archiving note:', error);
        //     throw new Error('Error archiving note');
        //   }
        // };
    }
}
exports.default = NoteService;
