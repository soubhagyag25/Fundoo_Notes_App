import Note from '../models/note.model';
import redisHelper from '../utils/redisHelper';

class NoteService {
  //! Create a new note
  public createNote = async (noteData: any) => {
    try {
      const note = await Note.create(noteData);
      if (note) {
        await redisHelper.set(`note:${note.id}`, JSON.stringify(note));
        await redisHelper.delete(`notes:${note.CreatedBy}`); // Invalidate cache
      }
      return note;
    } catch (error) {
      console.error('Error creating note:', error);
      throw new Error('Error creating note');
    }
  };
  //! Update a note by ID and user ID
  public updateNote = async (noteId: number, userId: number, updateData: any) => {
    try {
      // Fetch the note based on ID and user ID
      const note = await Note.findOne({ where: { id: noteId, CreatedBy: userId } });
      
      if (!note) {
        console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${userId}`);
        return null; // Note not found or unauthorized
      }
      
      // Check if the note is archived or in trash
      if (note.isArchived) {
        throw new Error('Cannot update a note that is archived');
      }
      
      if (note.isInTrash) {
        throw new Error('Cannot update a note that is in trash');
      }
      
      // Update note fields
      note.title = updateData.title || note.title;
      note.description = updateData.description || note.description;
      
      // Save updated note
      await note.save();
      
      // Cache updated note and invalidate relevant caches
      await redisHelper.set(`note:${note.id}`, JSON.stringify(note));
      await redisHelper.delete(`notes:${userId}`); // Invalidate user notes cache
      
      return note;
    } catch (error) {
      console.error(`Error updating note for noteId: ${noteId}, userId: ${userId}`, error);
      throw error;
    }
  };
  //! Archive a note by ID and user ID
  public archiveNote = async (noteId: number, CreatedBy: number) => {
    try {
      const note = await Note.findOne({ where: { id: noteId, CreatedBy } });
      if (note) {
        if (note.isInTrash) {
          throw new Error('Note is in trash and cannot be archived');
        }
        note.isArchived = true;
        await note.save();
        await redisHelper.set(`note:${note.id}`, JSON.stringify(note));
        await redisHelper.delete(`notes:${CreatedBy}`);
        await redisHelper.delete(`archivedNotes:${CreatedBy}`);
      } else {
        console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${CreatedBy}`);
        return null;
      }
      return note;
    } catch (error) {
      console.error(`Error archiving note for noteId: ${noteId}, userId: ${CreatedBy}`, error);
      throw new Error('Error archiving note');
    }
  };

  //! Move a note to trash
  public moveToTrash = async (noteId: number, CreatedBy: number) => {
    try {
      const note = await Note.findOne({ where: { id: noteId, CreatedBy } });
      if (note) {
        note.isInTrash = true;
        note.isArchived = false;
        await note.save();
        await redisHelper.set(`note:${note.id}`, JSON.stringify(note));
        await redisHelper.delete(`notes:${CreatedBy}`);
        await redisHelper.delete(`trashedNotes:${CreatedBy}`);
      } else {
        console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${CreatedBy}`);
        return null;
      }
      return note;
    } catch (error) {
      console.error(`Error moving note to trash for noteId: ${noteId}, userId: ${CreatedBy}`, error);
      throw new Error('Error moving note to trash');
    }
  };

  //! Permanently delete a note from trash
  public deleteFromTrash = async (noteId: number, CreatedBy: number) => {
    try {
      const note = await Note.findOne({ where: { id: noteId, CreatedBy, isInTrash: true } });
      if (note) {
        await note.destroy();
        await redisHelper.delete(`note:${noteId}`);
        await redisHelper.delete(`trashedNotes:${CreatedBy}`);
        return true;
      } else {
        console.warn(`Note not found or not in trash: noteId=${noteId}, userId=${CreatedBy}`);
        return false;
      }
    } catch (error) {
      console.error(`Error deleting note from trash for noteId: ${noteId}, userId: ${CreatedBy}`, error);
      throw new Error('Error deleting note from trash');
    }
  };

  //! Restore a note from trash
  public restoreFromTrash = async (noteId: number, CreatedBy: number) => {
    try {
      const note = await Note.findOne({ where: { id: noteId, CreatedBy, isInTrash: true } });
      if (note) {
        note.isInTrash = false;
        await note.save();
        await redisHelper.set(`note:${note.id}`, JSON.stringify(note));
        await redisHelper.delete(`trashedNotes:${CreatedBy}`);
        await redisHelper.delete(`notes:${CreatedBy}`);
        return note;
      } else {
        console.warn(`Note not found or not in trash: noteId=${noteId}, userId=${CreatedBy}`);
        return null;
      }
    } catch (error) {
      console.error(`Error restoring note from trash for noteId: ${noteId}, userId: ${CreatedBy}`, error);
      throw new Error('Error restoring note from trash');
    }
  };

  //! To UNARCHIVE an Archived note
  public unarchiveNote = async (noteId: number, CreatedBy: number) => {
    try {
      const note = await Note.findOne({ where: { id: noteId, CreatedBy } });
      if (note) {
        if (note.isInTrash) {
          return null; // Cannot unarchive a note in trash
        }
        note.isArchived = false;
        await note.save();
        await redisHelper.set(`note:${note.id}`, JSON.stringify(note));
        await redisHelper.delete(`archivedNotes:${CreatedBy}`);
        await redisHelper.delete(`notes:${CreatedBy}`);
        return note;
      } else {
        console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${CreatedBy}`);
        return null;
      }
    } catch (error) {
      console.error(`Error unarchiving note for noteId: ${noteId}, userId: ${CreatedBy}`, error);
      throw new Error('Error unarchiving note');
    }
  };

  //! Get all unarchived and non-trashed notes for a user
  public getAllNotes = async (CreatedBy: number) => {
    try {
      const notes = await Note.findAll({
        where: {
          CreatedBy,
          isArchived: false,
          isInTrash: false,
        },
      });

      if (notes) {
        await redisHelper.set(`notes:${CreatedBy}`, JSON.stringify(notes));
      }
      return notes;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw new Error('Error fetching notes');
    }
  };

  //! Get all notes that are in archive
  public getArchivedNotes = async (CreatedBy: number) => {
    try {
      const archivedNotes = await Note.findAll({
        where: { CreatedBy, isArchived: true, isInTrash: false },
      });

      if (archivedNotes) {
        await redisHelper.set(`archivedNotes:${CreatedBy}`, JSON.stringify(archivedNotes));
      }
      return archivedNotes;
    } catch (error) {
      console.error('Error fetching archived notes:', error);
      throw new Error('Error fetching archived notes');
    }
  };

  //! Get all notes that are in trash
  public getTrashedNotes = async (CreatedBy: number) => {
    try {
      const trashedNotes = await Note.findAll({
        where: { CreatedBy, isInTrash: true },
      });

      if (trashedNotes) {
        await redisHelper.set(`trashedNotes:${CreatedBy}`, JSON.stringify(trashedNotes));
      }
      return trashedNotes;
    } catch (error) {
      console.error('Error fetching trashed notes:', error);
      throw new Error('Error fetching trashed notes');
    }
  };

//! Get a note by ID
public async getNoteById(noteId: number, userId: number): Promise<Note | null> {
  try {
    const note = await Note.findOne({
      where: {
        id: noteId,
        CreatedBy: userId,
        isArchived: false,
        isInTrash: false
      },
    });

    if (!note) {
      console.error(`Note with ID ${noteId} not found for user ${userId} or in Trash/Archived`);
    }

    return note || null;
  } catch (error) {
    console.error('Error fetching note by ID:', error.message, error.stack);
    throw new Error('Error fetching note');
  }
};
}

export default NoteService;
