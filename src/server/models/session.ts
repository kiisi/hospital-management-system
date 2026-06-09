import mongoose from 'mongoose'
import { UserRole } from '../../../types/enum'
import type { Types } from 'mongoose';

export interface ISession {
  sessionId: string;
  userId: Types.ObjectId;
  role: UserRole;
  expiresAt?: Date;
}

const SessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true
  },
  expiresAt: {
    type: Date,
  }
}, {
  timestamps: true
})

// TTL index to auto-delete expired sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const SessionModel = mongoose.models.Session || mongoose.model('Session', SessionSchema)