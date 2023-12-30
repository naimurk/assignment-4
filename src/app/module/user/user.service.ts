import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { TUser } from "./user.interface";
import User from "./user.model";


const createUserIntoDb = async (payload:TUser)=> {
    const findUser = await User.findOne({email: payload.email, username: payload.username})
    if(findUser){
        throw new AppError(httpStatus.FORBIDDEN,"user already exists", "user already exists")
    }
    const result = await User.create(payload);
    return result
}



export const userService = {
    createUserIntoDb
}