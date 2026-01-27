import mongoose, { Schema, models, model } from "mongoose";

const MedicineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: {
      type: [String],
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Medicine =
  models.Medicine || model("Medicine", MedicineSchema);
