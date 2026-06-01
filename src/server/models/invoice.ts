import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export enum InvoiceStatus {
  PENDING = "pending",
  PAID = "paid",
  PARTIAL = "partial",
}

export interface IInvoice {
  patientId: Types.ObjectId;
  items: {
    service: string;
    amount: number;
  }[];
  totalAmount: number;
  status: InvoiceStatus;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    items: [
      {
        service: String,
        amount: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: Object.values(InvoiceStatus),
      default: InvoiceStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const Invoice = model<IInvoice>(
  "Invoice",
  InvoiceSchema
);