import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export interface IAuditLog {
  userId: Types.ObjectId;
  action: string;
  resource: string;
  resourceId: Types.ObjectId;
  ipAddress?: string;
}

const AuditLogSchema =
  new Schema<IAuditLog>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      action: String,
      resource: String,
      resourceId: Schema.Types.ObjectId,
      ipAddress: String,
    },
    { timestamps: true }
  );

export const AuditLog =
  model<IAuditLog>(
    "AuditLog",
    AuditLogSchema
  );