import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export interface IDoctor {
  userId: Types.ObjectId;
  specialization: string;
  email: string;
  phoneNumber: string;
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    phoneNumber: String,
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

export const Doctor = model<IDoctor>(
  "Doctor",
  DoctorSchema
);