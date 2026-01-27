import mongoose, { Schema, models, model } from "mongoose";

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true, // hashed
    },
  },
  { timestamps: true }
);

export const Admin =
  models.Admin || model("Admin", AdminSchema);
