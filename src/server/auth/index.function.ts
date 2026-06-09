import { createServerFn } from "@tanstack/react-start"
import { useAppSession } from "../session"
import { dbConnect } from "../db"
import { UserModel } from "../models/user"
// import { seedDatabase } from "../seed"

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
  console.log("RUnning")
  await dbConnect();
  //  await seedDatabase();
  const user = await UserModel.findById(userId);
  const payload = user;
  payload.password = undefined;

  return JSON.parse(JSON.stringify(payload));
}
