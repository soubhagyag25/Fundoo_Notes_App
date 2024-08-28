import { Request, Response, NextFunction } from 'express';
import redisHelper from '../utils/redisHelper';

// Cache keys for notes
const ALL_NOTES_KEY = (userId: number) => `notes:${userId}`;
const ARCHIVED_NOTES_KEY = (userId: number) => `archivedNotes:${userId}`;
const TRASHED_NOTES_KEY = (userId: number) => `trashedNotes:${userId}`;

// Function to handle JSON parsing safely
const safeParseJson = (data: string | null): any => {
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
};

// Middleware to get all notes from cache
export const getAllNotesCache = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const key = ALL_NOTES_KEY(userId);
  console.log(`Checking cache for key: ${key}`);

  const cachedNotes = await redisHelper.get(key);

  if (cachedNotes.data) {
    const notes = safeParseJson(cachedNotes.data);
    if (notes !== null) {
      console.log(`Returning cached notes for key: ${key}`);
      return res.json({
        success: true,
        fromCache: true,
        data: notes,
      });
    } else {
      console.warn(`Cached data for key ${key} is not valid JSON.`);
    }
  }
  next();
};

// Middleware to get archived notes from cache
export const getArchivedNotesCache = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const key = ARCHIVED_NOTES_KEY(userId);
  console.log(`Checking cache for key: ${key}`);

  const cachedArchivedNotes = await redisHelper.get(key);

  if (cachedArchivedNotes.data) {
    const archivedNotes = safeParseJson(cachedArchivedNotes.data);
    if (archivedNotes !== null) {
      console.log(`Returning cached archived notes for key: ${key}`);
      return res.json({
        success: true,
        fromCache: true,
        data: archivedNotes,
      });
    } else {
      console.warn(`Cached data for key ${key} is not valid JSON.`);
    }
  }

  next();
};

// Middleware to get trashed notes from cache
export const getTrashedNotesCache = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const key = TRASHED_NOTES_KEY(userId);
  console.log(`Checking cache for key: ${key}`);

  const cachedTrashedNotes = await redisHelper.get(key);

  if (cachedTrashedNotes.data) {
    const trashedNotes = safeParseJson(cachedTrashedNotes.data);
    if (trashedNotes !== null) {
      console.log(`Returning cached trashed notes for key: ${key}`);
      return res.json({
        success: true,
        fromCache: true,
        data: trashedNotes,
      });
    } else {
      console.warn(`Cached data for key ${key} is not valid JSON.`);
    }
  }

  next();
};
