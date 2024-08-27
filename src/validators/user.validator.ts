import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {

  //! Validate SignUp
  public validateSignUp = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(2).required(),
      lastName: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    this.validateRequest(req, next, schema);
  };

  //! Validate Login
  public validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    this.validateRequest(req, next, schema);
  };

  //!Validate Forget Password
  public validateForgetPassword = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    this.validateRequest(req, next, schema);
  };

  //! Validate Reset Password
  public validateResetPassword = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      newPassword: Joi.string().min(8).required(),
    });
    this.validateRequest(req, next, schema);
  };

  //! Validate Request
  private validateRequest(req: Request, next: NextFunction, schema: Joi.ObjectSchema): void {
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    } else {
      next();
    }
  }
}

export default UserValidator;
