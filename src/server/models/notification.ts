import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export interface INotification {
  recipientId: Types.ObjectId;
  title: string;
  message: string;
  channel: "email" | "sms" | "system";
  isRead: boolean;
}

const NotificationSchema =
  new Schema<INotification>(
    {
      recipientId: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
      title: String,
      message: String,
      channel: {
        type: String,
        enum: ["email", "sms", "system"],
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

export const Notification =
  model<INotification>(
    "Notification",
    NotificationSchema
  );