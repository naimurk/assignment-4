import { Types } from "mongoose";


export type TPasswordHistory = {
   userId : Types.ObjectId,
   password: string,
   timeStamp: Date,
}

