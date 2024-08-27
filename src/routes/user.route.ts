import express, { IRouter } from 'express';
import UserController from '../controllers/user.controller';
import { ResetAuth } from '../middlewares/auth.middleware';
import UserValidator from '../validators/user.validator';

class UserRoutes {
  private UserController = new UserController();
  private UserValidator = new UserValidator();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //! Route to Sign Up for a new USER
    this.router.post('/signup', this.UserValidator.validateSignUp, this.UserController.SignUp);

    //! Route for user login
    this.router.post('/login', this.UserValidator.validateLogin, this.UserController.loginUser);

    //! Forget Password Route
    this.router.post('/forget-password', this.UserValidator.validateForgetPassword, this.UserController.forgetPassword);

    //! Reset Password with Login Token Route
    this.router.post('/reset-password', ResetAuth, this.UserValidator.validateResetPassword, this.UserController.resetPasswordWithToken);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
