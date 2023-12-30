import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";


const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.post("save", async function (doc , next){
  doc.set("password", undefined);
  doc.set("passwordChangedAt", undefined);
 next()
})
// userSchema.post("findOne", async function (doc , next){
//   doc.set("password", undefined);
//   doc.set("passwordChangedAt", undefined);
//  next()
// })



const User = model<TUser>("User", userSchema);

export default User;
