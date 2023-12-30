import { JwtPayload } from "jsonwebtoken"
import { TCategory } from "./category.interface"
import { Category } from "./category.model"
import User from "../user/user.model"
import { AppError } from "../../errors/AppError"

const CreateCategoryIntoDb = async ( decodedToken: JwtPayload,payload: TCategory)=> {
  // console.log(decodedToken);
  const findUser = await User.findOne({email: decodedToken.email})
  if(!findUser) throw new AppError(404, "User not found","User not found")
  const result = await Category.create({
    ...payload, createdBy: findUser?._id?.toString()
  })
  return result
}



const getAllCategoryIntoDb = async ()=> {
  const result = await Category.find({}).populate("createdBy")
  return result
}




export  const categoryService = {
    CreateCategoryIntoDb,
    getAllCategoryIntoDb
}