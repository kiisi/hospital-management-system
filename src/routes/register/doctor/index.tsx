import { Input } from '@/components/ui/Input'
import { dbConnect } from '@/server/db'
import { UserModel } from '@/server/models/user'
import { createFileRoute, Link } from '@tanstack/react-router'
import bcrypt from 'bcryptjs'
import { UserRole } from '../../../../types/enum'
import { DoctorModel } from '@/server/models/doctor'
import { useAppSession } from '@/server/session'
import * as Yup from "yup";
import { useFormik } from "formik";
import type { RegisterDoctorInput } from '@/server/auth/register.function'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ErrorFeedback } from '@/components/toast'
import { createSession } from '@/server/auth/index.server'

export const Route = createFileRoute('/register/doctor/')({
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
            role: UserRole.DOCTOR,
          });

          const patient = await DoctorModel.create({
            userId: user._id,
            firstName: body.firstName,
            lastName: body.lastName,
            email: user.email,
            specialization: body.specialization,
            phoneNumber: body.phone,
            hospitalName: body.hospital,
            yearsOfExperience: body.yearsOfExperience,
            medicalLicenseNumber: body.licenseNumber,
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

export const registerDoctorSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required"),
  lastName: Yup.string()
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required"),
  licenseNumber: Yup.string()
    .required("License number is required"),
  specialization: Yup.string()
    .required("Specialization is required"),
  hospital: Yup.string()
    .required("Hospital is required"),
  yearsOfExperience: Yup.string()
    .required("Years of experience is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function RouteComponent() {

  const formik = useFormik<RegisterDoctorInput>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      specialization: '',
      hospital: '',
      yearsOfExperience: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerDoctorSchema,
    onSubmit: (values) => mutate(values),
  });

  const { data, mutate, isPending } = useMutation({
    mutationFn: (payload: RegisterDoctorInput) => {
      return fetch('/register/doctor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(res => res.json())
    },
  })

  console.log("Data: ", data);
  if (data?.success) {
    window.location.href = "/doctor";
  }

  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <figure className='h-full w-full hidden lg:block'>
        <img
          src="/register/register.png"
          alt="Register as Doctor"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="py-10 px-10 flex flex-col items-center overflow-y-auto">
        <div className="my-auto w-full max-w-[900px]">
          <h1 className="text-[32px] font-bold mb-2">Register as Doctor</h1>
          <p className="text-gray-600 mb-6">Create your account to start managing patients</p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset>
                <label htmlFor="firstName" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
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
                  placeholder="Enter your last name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-xs text-destructive">{formik.errors.lastName}</p>
                )}
              </fieldset>
            </div>

            <fieldset>
              <label htmlFor="email" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Email Address
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

            <fieldset>
              <label htmlFor="phone" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-xs text-destructive">{formik.errors.phone}</p>
              )}
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset>
                <label htmlFor="licenseNumber" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  Medical License Number
                </label>
                <Input
                  type="text"
                  id="licenseNumber"
                  placeholder="Enter license number"
                  {...formik.getFieldProps("licenseNumber")}
                />
                {formik.touched.licenseNumber && formik.errors.licenseNumber && (
                  <p className="mt-1 text-xs text-destructive">{formik.errors.licenseNumber}</p>
                )}
              </fieldset>

              <fieldset>
                <label htmlFor="specialization" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  Specialization
                </label>
                <select
                  id="specialization"
                  className="flex h-[48px] w-full rounded-xl border border-gray-200/80 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50 px-4 py-2 placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all leading-[100%]"
                  {...formik.getFieldProps("specialization")}
                >
                  <option value="">Select specialization</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="endocrinology">Endocrinology</option>
                  <option value="gastroenterology">Gastroenterology</option>
                  <option value="neurology">Neurology</option>
                  <option value="obstetrics">Obstetrics & Gynecology</option>
                  <option value="oncology">Oncology</option>
                  <option value="ophthalmology">Ophthalmology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="psychiatry">Psychiatry</option>
                  <option value="pulmonology">Pulmonology</option>
                  <option value="radiology">Radiology</option>
                  <option value="surgery">Surgery</option>
                  <option value="urology">Urology</option>
                  <option value="other">Other</option>
                </select>
                {formik.touched.specialization && formik.errors.specialization && (
                  <p className="mt-1 text-xs text-destructive">{formik.errors.specialization}</p>
                )}
              </fieldset>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset>
                <label htmlFor="hospital" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  Hospital/Clinic Name
                </label>
                <Input
                  type="text"
                  id="hospital"
                  placeholder="Enter hospital name"
                  {...formik.getFieldProps("hospital")}
                />
                {formik.touched.hospital && formik.errors.hospital && (
                  <p className="mt-1 text-xs text-destructive">{formik.errors.hospital}</p>
                )}
              </fieldset>

              <fieldset>
                <label htmlFor="yearsOfExperience" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  id="yearsOfExperience"
                  placeholder="Enter years of experience"
                  {...formik.getFieldProps("yearsOfExperience")}
                  min="0"
                  max="60"
                  required
                />
                {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                  <p className="mt-1 text-xs text-destructive">{formik.errors.yearsOfExperience}</p>
                )}
              </fieldset>
            </div>

            <fieldset>
              <label htmlFor="password" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Create a password"
                {...formik.getFieldProps("password")}
                required
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
              Register as Doctor
            </Button>
            <p className='text-[#505c7e] text-center text-[14px] lg:text-[16px]'>
              Already have an account?  <Link to='/login/doctor' className='text-primary hover:underline'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}