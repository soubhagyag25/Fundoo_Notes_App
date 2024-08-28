import { Request, Response, NextFunction } from 'express';
import redisHelper from '../utils/redisHelper';

// Cache keys for notes
const ALL_NOTES_KEY = (userId: number) => `notes:${userId}`;
const ARCHIVED_NOTES_KEY = (userId: number) => `archivedNotes:${userId}`;
const TRASHED_NOTES_KEY = (userId: number) => `trashedNotes:${userId}`;

// Middleware to get all notes from cache
export const getAllNotesCache = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const cachedNotes = await redisHelper.get(ALL_NOTES_KEY(userId));

  if (cachedNotes) {
    return res.json(cachedNotes);
  }

  next();
};

// Middleware to get archived notes from cache
export const getArchivedNotesCache = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const cachedArchivedNotes = await redisHelper.get(ARCHIVED_NOTES_KEY(userId));

  if (cachedArchivedNotes) {
    return res.json(cachedArchivedNotes);
  }

  next();
};

// Middleware to get trashed notes from cache
export const getTrashedNotesCache = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const cachedTrashedNotes = await redisHelper.get(TRASHED_NOTES_KEY(userId));

  if (cachedTrashedNotes) {
    return res.json(cachedTrashedNotes);
  }

  next();
};
