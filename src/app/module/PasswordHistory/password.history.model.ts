import { Schema, model } from "mongoose";
import { TPasswordHistory } from "./password.history.interface";


const PasswordHistorySchema = new Schema<TPasswordHistory>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    password: {
        type: String, required: true
    },
    timeStamp: {
        type: Date, default: Date.now(),
    }
})


 export const PasswordHistory = model<TPasswordHistory>('PasswordHistory', PasswordHistorySchema)
  