import express, { IRouter } from 'express';
import NoteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { getAllNotesCache, getArchivedNotesCache, getTrashedNotesCache } from '../middlewares/noteRedis.middleware';

class NoteRoutes {
  private noteController = new NoteController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //! Route to CREATE a new note (Auth required)
    this.router.post('/create', userAuth, this.noteController.createNote);

    //! Route to update a note by ID (Auth required)
    this.router.put('/:noteId/update', userAuth, this.noteController.updateNote);

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

    //! Route to Get all notes (Auth required)
    this.router.get('/all', userAuth, getAllNotesCache, this.noteController.getAllNotes);

    //! Route to get all archived notes (Auth required)
    this.router.get('/archived', userAuth, getArchivedNotesCache, this.noteController.getArchivedNotes);

    //! Route to get all trashed notes (Auth required)
    this.router.get('/trashed', userAuth, getTrashedNotesCache, this.noteController.getTrashedNotes);

    //! Route to get a note by ID (Auth required)
    this.router.get('/:noteId/getNote', userAuth, this.noteController.getNoteById);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;
