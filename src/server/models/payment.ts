import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export enum PaymentMethod {
  CARD = "card",
  BANK_TRANSFER = "bank_transfer",
}

export interface IPayment {
  invoiceId: Types.ObjectId;
  amount: number;
  method: PaymentMethod;
  transactionReference?: string;
}

const PaymentSchema = new Schema<IPayment>(
  {
    invoiceId: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
    amount: Number,
    method: {
      type: String,
      enum: Object.values(PaymentMethod),
    },
    transactionReference: String,
  },
  { timestamps: true }
);

export const Payment = model<IPayment>(
  "Payment",
  PaymentSchema
);