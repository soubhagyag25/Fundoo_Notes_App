import express, { IRouter } from 'express';
import NoteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import redisHelper from '../utils/redisHelper';

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

    //! Route to Get all notes (Auth required)
    this.router.get('/all', userAuth, async (req, res, next) => {
      const cachedNotes = await redisHelper.get(`notes:${req.user.id}`);
      if (cachedNotes) return res.json(cachedNotes);

      next();
    }, this.noteController.getAllNotes);

    //! Route to get all archived notes (Auth required)
    this.router.get('/archived', userAuth, async (req, res, next) => {
      const cachedArchivedNotes = await redisHelper.get(`archivedNotes:${req.user.id}`);
      if (cachedArchivedNotes) return res.json(cachedArchivedNotes);

      next();
    }, this.noteController.getArchivedNotes);

    //! Route to get all trashed notes (Auth required)
    this.router.get('/trashed', userAuth, async (req, res, next) => {
      const cachedTrashedNotes = await redisHelper.get(`trashedNotes:${req.user.id}`);
      if (cachedTrashedNotes) return res.json(cachedTrashedNotes);

      next();
    }, this.noteController.getTrashedNotes);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;
