import { model, Schema } from "mongoose";

export const UserModel = model(
  "user",
  new Schema({
    email: {
      required: true,
      type: String,
      unique: true,
    },

    password: {
      required: true,
      type: String,
    },
  })
);
