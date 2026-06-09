import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export interface IDoctor {
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  phoneNumber: string;
  hospitalName: string;
  yearsOfExperience: string;
  medicalLicenseNumber: string;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  isAvailable: boolean;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true, unique: true, trim: true },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    phoneNumber: String,
    hospitalName: String,
    yearsOfExperience: String,
    medicalLicenseNumber: String,
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const DoctorModel = model<IDoctor>(
  "Doctor",
  DoctorSchema
);