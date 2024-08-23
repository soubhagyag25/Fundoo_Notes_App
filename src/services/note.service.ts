//src>services>note.service.ts
import Note from '../models/note.model';

class NoteService {
  //! Create a new note
  public createNote = async (noteData: any) => {
    try {
      const note = await Note.create(noteData);
      return note;
    } catch (error) {
      console.error('Error creating note:', error);
      throw new Error('Error creating note');
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
        return note;
      } else {
        console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${CreatedBy}`);
        return null;
      }
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
        note.isArchived = false; // Now here if the Note was in Archive,it will go to trash and isArchived becomes False
        await note.save();
        return note;
      } else {
        console.warn(`Note not found or not authorized: noteId=${noteId}, userId=${CreatedBy}`);
        return null;
      }
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
      return await Note.findAll({
        where: {
          CreatedBy,
          isArchived: false,
          isInTrash: false,
        },
      });
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw new Error('Error fetching notes');
    }
  };
  //! Get all notes that are in archive
  public getArchivedNotes = async (CreatedBy: number) => {
    try {
      const archivedNotes = await Note.findAll({ where: { CreatedBy, isArchived: true, isInTrash: false } });
      return archivedNotes;
    } catch (error) {
      console.error('Error fetching archived notes:', error);
      throw new Error('Error fetching archived notes');
    }
  };

  //! Get all notes that are in trash
  public getTrashedNotes = async (CreatedBy: number) => {
    try {
      const trashedNotes = await Note.findAll({ where: { CreatedBy, isInTrash: true } });
      return trashedNotes;
    } catch (error) {
      console.error('Error fetching trashed notes:', error);
      throw new Error('Error fetching trashed notes');
    }
  };

}

export default NoteService;