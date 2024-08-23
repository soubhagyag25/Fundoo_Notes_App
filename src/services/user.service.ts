//src>services>user.service.ts
import bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import User from '../models/user'; 
import { IUser } from '../interfaces/user.interface'; 
import { UserDTO } from '../interfaces/user.dto';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/EmailSender';
class UserService {

 
//! Sign Up or Creating a new User
 public SignUp = async (body: IUser) => {

  //^  Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);

  // Creating a new user with the hashed password
  try {
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
};

//! Login User
  public loginUser = async (email: string, password: string): Promise<UserDTO> => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Return a simplified user object
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token:token
    };
  };
  public getUser = async (id: string) => {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Error fetching user');
    }
  };

//!Finding a User by Email -------- Forget Password
public findUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email } });  // Find the user by email
  if (!user) {
      return null; //-->Returning Null if user does not exist
  }
  const reset_token = jwt.sign( //-->Here we are generating a token if user exists
      { id: user.id },
      process.env.RESET_SECRET_KEY!,
      { expiresIn: '1h' }
  );
  await sendEmail(user.email, reset_token,user.firstName);
  return user;
};

//! Update user's password
public updateUserPassword = async (userId: string, newPassword: string) => {
    const hashedPassword = await hash(newPassword, 10);
    return User.update({ password: hashedPassword }, { where: { id: userId } });
};
  
}

export default UserService;