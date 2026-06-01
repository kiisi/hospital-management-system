import mongoose from "mongoose";
import { UserRole } from "../../../types/enum";

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
  isActive?: boolean;
  lastLogin?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(UserRole), required: true },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);