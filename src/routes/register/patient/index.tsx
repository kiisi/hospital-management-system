
import { Input } from '@/components/ui/Input'
import type { RegisterPatientInput } from '@/server/auth/register.function'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from '@/components/ui/button'
import { ErrorFeedback } from '@/components/toast'
import { dbConnect } from '@/server/db'
import { UserModel } from '@/server/models/user'
import { useAppSession } from '@/server/session'
import bcrypt from 'bcryptjs'
import { UserRole } from '../../../../types/enum'
import { PatientModel } from '@/server/models/patient';
import { createSession } from '@/server/auth/index.server';

export const registerPatientSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required"),
  lastName: Yup.string()
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const Route = createFileRoute('/register/patient/')({
  component: RouteComponent,
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()

        try {
          await dbConnect();

          const existingUser = await UserModel.findOne({ email: body.email });

          if (existingUser) {
            return Response.json({
              success: false,
              message: "Account already exists",
            }, { status: 409 })
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(body.password, 12)

          // Create user
          const user = await UserModel.create({
            email: body.email,
            password: hashedPassword,
            role: UserRole.PATIENT,
          });

          const patient = await PatientModel.create({
            userId: user._id,
            firstName: body.firstName,
            lastName: body.lastName,
          });

          // Create session
          const session = await useAppSession();

          await session.update({
            userId: user.id,
            email: user.email,
            role: user.role
          })

          await createSession(session.id ?? '', user.id, user.role);

          return Response.json({
            success: true,
            message: "Registration successfully",
            data: patient,
          }, { status: 201 })

        } catch (error) {
          console.error("Registration Error:", error);
          return Response.json({
            success: false,
            message: "An error occurred during registration. Please try again.",
          }, { status: 500 });
        }
      },
    }
  }
})

function RouteComponent() {

  const { data, mutate, isPending } = useMutation({
    mutationFn: (payload: RegisterPatientInput) => {
      return fetch('/register/patient/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(res => res.json())
    },
  })

  const formik = useFormik<RegisterPatientInput>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerPatientSchema,
    onSubmit: (values) => mutate(values),
  });

  console.log("Data: ", data);
  if (data?.success) {
    window.location.href = "/patient";
  }

  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <figure className='h-full w-full hidden lg:block'>
        <img
          src="/register/register.png"
          alt="Register as Patient"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="py-10 px-10 flex flex-col items-center overflow-y-auto">
        <div className="my-auto w-full max-w-[900px]">
          <h1 className="text-[32px] font-bold mb-6">Register as Patient</h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-4">
              <fieldset>
                <label htmlFor="firstName" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="mt-1 text-xs text-destructive">{formik.errors.firstName}</p>
                )}
              </fieldset>
              <fieldset>
                <label htmlFor="lastName" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-xs text-destructive">{formik.errors.lastName}</p>
                )}
              </fieldset>
            </div>

            <fieldset>
              <label htmlFor="email" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-destructive">{formik.errors.email}</p>
              )}
            </fieldset>

            {/* <fieldset>
              <label htmlFor="gender" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Gender
              </label>
              <select
                id="gender"
                className="flex h-[48px] w-full rounded-xl border border-gray-200/80 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50 px-4 py-2 placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all leading-[100%]"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </fieldset> */}

            {/* <fieldset>
              <label htmlFor="bloodGroup" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                className="flex h-[48px] w-full rounded-xl border border-gray-200/80 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50 px-4 py-2 placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all leading-[100%]"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </fieldset> */}

            <fieldset>
              <label htmlFor="password" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Create a password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-destructive">{formik.errors.password}</p>
              )}
            </fieldset>

            <fieldset className='mb-4'>
              <label htmlFor="confirmPassword" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-xs text-destructive">{formik.errors.confirmPassword}</p>
              )}
            </fieldset>

            {data?.success === false && <ErrorFeedback message={data.message} />}

            <Button isLoading={isPending} type='submit'>
              Register
            </Button>
            <p className='text-[#505c7e] text-center text-[14px] lg:text-[16px]'>
              Already have an account?  <Link to='/login/patient' className='text-primary hover:underline'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}