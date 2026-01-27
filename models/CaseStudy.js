import mongoose, { Schema, models, model } from "mongoose";

const CaseStudySchema = new Schema(
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

export const CaseStudy =
  models.CaseStudy || model("CaseStudy", CaseStudySchema);
