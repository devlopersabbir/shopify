import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
