import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export interface IMedicalRecord {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    diagnosis: string;
    treatment: string;
    documents: string[];
    notes?: string;
}

const MedicalRecordSchema =
    new Schema<IMedicalRecord>(
        {
            patientId: {
                type: Schema.Types.ObjectId,
                ref: "patient",
            },
            doctorId: {
                type: Schema.Types.ObjectId,
                ref: "doctor",
            },
            diagnosis: String,
            treatment: String,
            documents: [String],
            notes: String,
        },
        { timestamps: true }
    );

export const MedicalRecord =
    model<IMedicalRecord>(
        "MedicalRecord",
        MedicalRecordSchema
    );