import type { Types } from "mongoose";
import mongoose from "mongoose";

export interface IPatient {
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  gender?: "male" | "female";
  address?: string;
  phoneNumber?: string;
  emergencyContactPhone?: string;
  bloodGroup?: string;
  isActive?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const PatientSchema = new mongoose.Schema<IPatient>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    bloodGroup: { type: String },
    phoneNumber: { type: String, trim: true },
    emergencyContactPhone: { type: String, trim: true },
    address: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female"] },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const PatientModel = mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);