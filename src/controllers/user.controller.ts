import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDTO } from '../interfaces/user.dto';
import { sendEmailMessage } from '../producers/messageProducer'; 

class UserController {
  public UserService = new userService();
  
   //! Sign Up or creating a new user
   public SignUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const data = await this.UserService.SignUp(req.body);
  
      const userData = data.toJSON();
      delete userData.password;
  
      // Send a message to RabbitMQ with user information
      await sendEmailMessage(
        userData.email,
        'Welcome to Fundoo Notes!',
        'Thank you for signing up for Fundoo Notes. We are excited to have you on board!'
      );
  
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: userData,
        message: 'User created successfully',
      });
    } catch (error) {
      console.error('Error during user creation:', error);
      next(error);
    }
  };
  
  //! Login User
  public loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { email, password } = req.body;
      const user: UserDTO = await this.UserService.loginUser(email, password);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: user,
        message: 'Login successful',
      });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  };

  //! Forget Password
  public forgetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.UserService.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Password reset token generated',
      data: user.reset_token,
    });
  };

  //! Reset Password Endpoint
  public resetPasswordWithToken = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'Token missing' });
    }

    const { newPassword } = req.body;

    try {
      const decoded: any = jwt.verify(token, process.env.RESET_SECRET_KEY!);
      await this.UserService.updateUserPassword(decoded.id, newPassword);

      return res.status(200).json({ message: 'Password has been changed successfully' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
  };
}

export default UserController;
