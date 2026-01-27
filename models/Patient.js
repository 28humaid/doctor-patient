import mongoose, { Schema, models, model } from "mongoose";

const AppointmentSchema = new Schema(
  {
    appointmentDate: {
      type: Date,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    prescription: {
      type: String,
    },
  },
  { _id: false }
);

const PatientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    appointments: [AppointmentSchema],
  },
  { timestamps: true }
);

export const Patient =
  models.Patient || model("Patient", PatientSchema);
