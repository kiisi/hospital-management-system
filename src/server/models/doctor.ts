import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export interface IDoctor {
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
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
}

const DoctorSchema = new Schema<IDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
  },
  { timestamps: true }
);

export const DoctorModel = model<IDoctor>(
  "Doctor",
  DoctorSchema
);