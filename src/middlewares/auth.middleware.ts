/* src>middlewares>auth.middleware.ts */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: { id: number }; // Add your user property here
    }
  }
}

function Authorization(secret_key:string)
{
   return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken) {
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required',
        };
      }
      bearerToken = bearerToken.split(' ')[1];
  
      const decodedToken: any = jwt.verify(bearerToken,secret_key );
  
      // Store userId in req.user
      req.user = { id: decodedToken.id };
  
      next();
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
  };
}
export const userAuth=Authorization(process.env.JWT_SECRET_KEY)
export const ResetAuth=Authorization(process.env.RESET_SECRET_KEY)
