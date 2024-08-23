//src>models>user.route.ts
import express, { IRouter } from 'express';
import UserController from '../controllers/user.controller';
import { ResetAuth} from '../middlewares/auth.middleware';


class UserRoutes {
  private UserController = new UserController();
  private router = express.Router();
  constructor() {
  this.routes();
  }
  private routes = () => {
    
//! Route to Sign Up for a new USER
this.router.post('/signup',this.UserController.SignUp);

//! Route for user login
    this.router.post('/login', this.UserController.loginUser);

//! Forget Password Route
this.router.post('/forget-password', this.UserController.forgetPassword);

//! Reset Password with Login Token Route
this.router.post('/reset-password', ResetAuth, this.UserController.resetPasswordWithToken);
};

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;




