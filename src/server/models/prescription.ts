import type { Types } from "mongoose";
import { Schema, model } from "mongoose";


export interface IPrescription {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  medications: {
    drugName: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];
}

const PrescriptionSchema =
  new Schema<IPrescription>(
    {
      patientId: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },

      doctorId: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },

      medications: [
        {
          drugName: String,
          dosage: String,
          duration: String,
          instructions: String,
        },
      ],
    },
    { timestamps: true }
  );

export const Prescription =
  model<IPrescription>(
    "Prescription",
    PrescriptionSchema
  );