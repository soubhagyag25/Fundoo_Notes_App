//src>middlewares>error.middleware.ts
import HttpStatus from 'http-status-codes';
import Logger from '../config/logger';
import { Request, Response, NextFunction } from 'express';

class ErrorMiddleware {
  private logger;

  constructor() {
    this.logger = Logger.logger;
  }
  public notFound = (req: Request, res: Response): void => {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: 'Ooops, route not found'
    });
  };
  public appErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err.code && typeof err.code === 'number') {
      this.logger.error(`
      status - ${err.code}
      message - ${err.message} 
      url - ${req.originalUrl} 
      method - ${req.method} 
      IP - ${req.ip}
    `);
      res.status(err.code).json({
        code: err.code,
        message: err.message
      });
    } else {
      next(err);
    }
  };
  public genericErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    this.logger.error(`
    status - ${HttpStatus.INTERNAL_SERVER_ERROR} 
    message - ${err.stack} 
    url - ${req.originalUrl} 
    method - ${req.method} 
    IP - ${req.ip}
  `);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: '',
      message: err.message
    });
  };
}

export default ErrorMiddleware;
