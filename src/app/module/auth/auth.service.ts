import { JwtPayload } from "jsonwebtoken";
import { passwordHelpers } from "../../helper/passwordHelper";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import { jwtHelpers } from "../../helper/jwtHelper";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import { PasswordHistory } from "../PasswordHistory/password.history.model";

interface IRegister extends Omit<TUser, "role" | "passwordChangedAt"> {}

const register = async (payload: IRegister) => {

  const checkUserExists = await User.findOne({email: payload.email, username: payload.username})

  if(checkUserExists){
    throw new AppError(httpStatus.FOUND, "user already exists", "user already exists")
  }
  const password = payload.password;
  const hashedPassword = await passwordHelpers.hashPassword(password);

  const result = await User.create({
    ...payload,
    password: hashedPassword,
    role: "user",
  });

  return result;
};

interface ILogin {
  username: string
  password: string
}

const login = async (payload: ILogin) => {
  const user = await User.findOne({ username: payload.username }).select('+password')
  if (!user) {
    throw new AppError(404, 'Invalid credentials', "invalid credentials")
  }

  const plainTextPassword = payload.password
  const hashedPassword = user.password

  const isCorrectPassword = await passwordHelpers.comparePassword(
    plainTextPassword,
    hashedPassword,
  )
  if (!isCorrectPassword) {
    throw new AppError(404,'Passwords do not match', "passwords do not match")
  }

  const jwtPayload: JwtPayload = {
    _id: user?._id.toString() ,
    email: user.email,
    role: user.role,
  }
  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expires_in as string,
    },
  )
  const result = await User.findOne({ username: payload.username },{passwordChangedAt: 0})



  return {
    user: result,
    token: accessToken
  }
}


const changePassword = async (
  decodedToken: JwtPayload,
  payload: {
    currentPassword: string
    newPassword: string
  },
) => {
  const { email, iat, _id } = decodedToken
  // console.log(_id)
  // console.log(iat, 'iat')

  const user = await User.findOne({ email }).select('+password')
// validation 1
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,"invalid credentials",'Invalid credentials')
  }
// validation 2
  if (!iat) {
    throw new AppError(400, "invalid toke" ,'Invalid token')
  }
// validation 3
  if (user.passwordChangedAt && iat < user.passwordChangedAt.getTime() / 1000) {
    throw new AppError(400, "unauthorized", "unauthorized")
  }


// validation 4
  const isCorrectPassword = await passwordHelpers.comparePassword(
    payload.currentPassword,
    user.password,
  )


// validation 5
  if (!isCorrectPassword) {
    throw new AppError(400, 'Invalid credentials', 'Invalid credentials')
  }

  const isNewPasswordAndCurrentPasswordSame = await passwordHelpers.comparePassword(
    payload.newPassword,
    user.password,
  )
//  validation 6
  if(isNewPasswordAndCurrentPasswordSame){
    throw new AppError(400, "New password and current password same", 'New password and current password same')
  }

  // validation 7

   // Check password history
   const passwordHistory = await PasswordHistory.find({ userId: _id }).sort({ timestamp: -1 }).limit(2);

   const isPasswordInHistory = await Promise.all(
    passwordHistory.map(async (history) => {
      return await passwordHelpers.comparePassword(payload.newPassword, history.password);
    })
  );
  
  
  const isAnyPasswordInHistory = isPasswordInHistory.some((result) => result);
  
  // Validation 7
  if (isAnyPasswordInHistory) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Password change failed. Ensure the new password is unique and not among the last 2 used',
      'Password change failed. Ensure the new password is unique and not among the last 2 used'
    );
  }


  //  const isPasswordInHistory =  passwordHistory.some((history) => passwordHelpers.comparePassword(payload.newPassword, history.password));
 
  // //  validation 7
  //  if (isPasswordInHistory) {
  //    throw new AppError(httpStatus.FORBIDDEN,'Password change failed. Ensure the new password is unique and not among the last 2 used' ,'Password change failed. Ensure the new password is unique and not among the last 2 used');
  //  }


  const hashedPassword = await passwordHelpers.hashPassword(payload.newPassword)

  const createAPasswordHistoryIntoDb = await PasswordHistory.create({ userId: _id, password: hashedPassword, timeStamp: Date.now()})

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  )

  const result = await User.findOne({ email },{password: 0, passwordChangedAt: 0})
  return result
}

export const authService = {
  register,
  login,
  changePassword,
};
