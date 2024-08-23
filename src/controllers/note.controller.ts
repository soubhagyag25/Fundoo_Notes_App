/* src/controllers/note.controller.ts */
import { Request, Response, NextFunction } from 'express';
import NoteService from '../services/note.service';

class NoteController {
  private noteService = new NoteService();

  //! Creating a New Note
  public createNote = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.user?.id;
    if (!title || !description || !userId) {
      return res.status(400).json({ message: 'Title, description, and user ID are required' });
    }
  
    try {
      const newNote = await this.noteService.createNote({
        title,
        description,
        CreatedBy: userId,
      });
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: 'Error creating note', error });
    }
  };
  

//! TO ARCHIVE A NOTE
public archiveNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = parseInt(req.params.noteId, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedNote = await this.noteService.archiveNote(noteId, userId);

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }

    res.status(200).json({ message: 'Note archived successfully', data: updatedNote });
  } catch (error) {
    console.error('Error archiving note:', error);
    res.status(500).json({ code: 500, message: 'Error archiving note' });
    next(error);
  }
};


//! Move note to trash
public moveToTrash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = parseInt(req.params.noteId, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedNote = await this.noteService.moveToTrash(noteId, userId);

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }

    res.status(200).json({ message: 'Note moved to trash successfully', data: updatedNote });
  } catch (error) {
    console.error('Error moving note to trash:', error);
    res.status(500).json({ code: 500, message: 'Error moving note to trash' });
    next(error);
  }
};

//! Permanently delete note from trash
public deleteFromTrash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = parseInt(req.params.noteId, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const success = await this.noteService.deleteFromTrash(noteId, userId);

    if (!success) {
      return res.status(404).json({ message: 'Note not found or not in trash' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note from trash:', error);
    res.status(500).json({ code: 500, message: 'Error deleting note from trash' });
    next(error);
  }
};

//! Restore note from trash
public restoreFromTrash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = parseInt(req.params.noteId, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedNote = await this.noteService.restoreFromTrash(noteId, userId);

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found or not in trash' });
    }

    res.status(200).json({ message: 'Note restored successfully', data: updatedNote });
  } catch (error) {
    console.error('Error restoring note from trash:', error);
    res.status(500).json({ code: 500, message: 'Error restoring note from trash' });
    next(error);
  }
};
//! To UNARCHIVE an Archived Note
public unarchiveNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = parseInt(req.params.noteId, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedNote = await this.noteService.unarchiveNote(noteId, userId);

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found, not authorized, or in trash' });
    }

    res.status(200).json({ message: 'Note unarchived successfully', data: updatedNote });
  } catch (error) {
    console.error('Error unarchiving note:', error);
    res.status(500).json({ code: 500, message: 'Error unarchiving note' });
    next(error);
  }
};

//! Get all unarchived and non-trashed notes for a user
   public getAllNotes = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id; // Assuming req.user contains the authenticated user's details
      const notes = await this.noteService.getAllNotes(userId);
      res.status(200).json({ success: true, notes });
    } catch (error) {
      console.error('Error getting all notes:', error);
      res.status(500).json({ success: false, message: 'Error getting all notes' });
    }
  };

//! Get all archived notes
   public getArchivedNotes = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const archivedNotes = await this.noteService.getArchivedNotes(userId);
      res.status(200).json({ success: true, notes: archivedNotes });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve archived notes' });
    }
  };

//! Get all trashed notes
  public getTrashedNotes = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const trashedNotes = await this.noteService.getTrashedNotes(userId);
      res.status(200).json({ success: true, notes: trashedNotes });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve trashed notes' });
    }
  };
  }

export default NoteController;
