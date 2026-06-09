import { dbConnect } from "../db"
import { SessionModel } from "../models/session"

// Get user session
export const getSession = async (sessionId: string) => {
  await dbConnect();

  const session = await SessionModel.findOne({ sessionId });
  console.log(session)

  return session
}

// create user session
export const createSession = async (sessionId: string, userId: string, role: string) => {

  await dbConnect();

  const session = await SessionModel.findOne({ sessionId })

  if (!session) {
    await SessionModel.create({
      sessionId,
      userId,
      role,
    });
  }
}

export async function deleteCookie(sessionId: string) {
  await dbConnect()
  await SessionModel.deleteOne({ sessionId })
}

export async function validateSession(sessionId: string) {
  await dbConnect()

  const session = await SessionModel.findOne({
    sessionId,
    expiresAt: { $gt: new Date() }
  }).lean()

  if (!session) return null

  // Extend session expiry
  await SessionModel.updateOne(
    { sessionId },
    { expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) }
  )

  return session
}