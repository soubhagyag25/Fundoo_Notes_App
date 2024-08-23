//src>routes>note.routes.ts
import express, { IRouter } from 'express';
import NoteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

class NoteRoutes {
  private noteController = new NoteController(); 
  private router = express.Router();

  constructor() {
    this.routes();
  }

 private routes = () => {

//! Route to CREATE a new note (Auth required)
this.router.post('/create', userAuth, this.noteController.createNote);

//! Route to archive a note (Auth required)
this.router.post('/:noteId/archive', userAuth, this.noteController.archiveNote);

//! Route to move a note to trash (Auth required)
this.router.post('/:noteId/trash', userAuth, this.noteController.moveToTrash);

//! Route to permanently delete a note from trash (Auth required)
this.router.delete('/:noteId/trash', userAuth, this.noteController.deleteFromTrash);

//! Route to restore a note from trash (Auth required)
this.router.post('/:noteId/restore', userAuth, this.noteController.restoreFromTrash);

//! Route to unarchive a note (Auth required)
this.router.post('/:noteId/unarchive', userAuth, this.noteController.unarchiveNote);

//! To Get all notes
this.router.get('/all', userAuth, this.noteController.getAllNotes);

//! Route to get all archived notes (Auth required)
this.router.get('/archived', userAuth, this.noteController.getArchivedNotes);

//! Route to get all trashed notes (Auth required)
this.router.get('/trashed', userAuth, this.noteController.getTrashedNotes);

};

public getRoutes = (): IRouter => {
    return this.router;
};
}

export default NoteRoutes;






