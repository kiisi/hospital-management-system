import bcrypt from 'bcryptjs'
import { createServerFn } from '@tanstack/react-start'
import { User } from '../models/user'
import { dbConnect } from '../db.server';
import { UserRole } from '../../../types/enum';
import { useAppSession } from '../session';
import { Patient } from '../models/patient';

export interface RegisterPatientInput {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
}

// patient registration
export const registerPatientFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: RegisterPatientInput) => data,
  )
  .handler(async ({ data }) => {

    try {
      await dbConnect();
      // Check if user exists
      const existingUser = await User.findOne({ email: data.email });

      if (existingUser) {
        return {
          success: false,
          message: "An account already exists",
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12)

      // Create user
      const user = await User.create({
        email: data.email,
        password: hashedPassword,
        role: UserRole.PATIENT,
      });

      const patient = await Patient.create({
        userId: user._id,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // Create session
      const session = await useAppSession()
      await session.update({
        userId: user.id,
        email: user.email,
        role: user.role
      })

      return { success: true, user: { id: user.id, email: user.email } }
    }
    catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "An error occurred during registration. Please try again.",
      }
    }
  })

// async function authenticateUser(email: string, password: string) {
//   const user = await getUserByEmail(email)
//   if (!user) return null

//   const isValid = await bcrypt.compare(password, user.password)
//   return isValid ? user : null
// }