import type { Types } from "mongoose";
import mongoose from "mongoose";

export enum AppointmentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  INPROGRESS = "in-progress",
}

export interface IAppointment {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  appointmentDate: Date;
  appointmentTime: string;
  reason: string;
  type: string;
  status: AppointmentStatus;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['in-person', 'video', 'phone'],
      required: true
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

// Compound index to prevent double booking
AppointmentSchema.index(
  { doctor: 1, appointmentDate: 1, appointmentTime: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: 'cancelled' } } }
)

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const AppointmentModel = mongoose.models.Appointment || mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);