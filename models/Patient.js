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
      default:undefined,
    },
  },
  {
    timestamps: true,          //each appointment gets createdAt/updatedAt
  }
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
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be a valid 10-digit Indian number"],
    },
    appointments: [AppointmentSchema],
  },
  { timestamps: true }
);

export const Patient =
  models.Patient || model("Patient", PatientSchema);
