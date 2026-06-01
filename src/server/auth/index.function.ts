import { createServerFn } from "@tanstack/react-start"
import { useAppSession } from "../session"
import { User } from "../models/user"
import { dbConnect } from "../db.server"

// Get current user
export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const userId = session.data.userId

    if (!userId) {
      return null
    }

    return await getUserById(userId)
  },
)

const getUserById = async (userId: string) => {
  await dbConnect();
  const user = await User.findById(userId);
  const payload = user;
  payload.password = undefined;
  return payload;
}