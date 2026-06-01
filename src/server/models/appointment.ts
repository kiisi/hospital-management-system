import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export enum AppointmentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export interface IAppointment {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  appointmentDate: Date;
  reason: string;
  status: AppointmentStatus;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    reason: String,
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
    },
  },
  { timestamps: true }
);

AppointmentSchema.index({
  doctorId: 1,
  appointmentDate: 1,
},
{
    unique: true,
});

export const Appointment = model<IAppointment>(
  "Appointment",
  AppointmentSchema
);