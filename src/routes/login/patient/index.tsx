import { Input } from '@/components/ui/Input'
import { getData } from '@/server/auth/login.function'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation, useQuery } from '@tanstack/react-query'
import { dbConnect } from '@/server/db.server'
import { UserModel } from '@/server/models/user'
import { UserRole } from '../../../../types/enum'
import bcrypt from 'bcryptjs'
import { useAppSession } from '@/server/session'
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from '@/components/ui/button'
import { ErrorFeedback } from '@/components/toast'

export const Route = createFileRoute("/login/patient/")({
  component: RouteComponent,
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();

        try {
          await dbConnect();

          const user = await UserModel.findOne({
            email: body.email,
          }).select("+password");

          if (!user) {
            return Response.json(
              {
                success: false,
                message: "Invalid email or password",
              },
              { status: 401 }
            );
          }

          if (user.role !== UserRole.PATIENT) {
            return Response.json(
              {
                success: false,
                message: "Invalid email or password",
              },
              { status: 401 }
            );
          }

          const isPasswordValid = await bcrypt.compare(
            body.password,
            user.password
          );

          if (!isPasswordValid) {
            return Response.json(
              {
                success: false,
                message: "Invalid email or password",
              },
              { status: 401 }
            );
          }

          const session = await useAppSession();

          await session.update({
            userId: user.id,
            email: user.email,
            role: user.role,
          });

          return Response.json(
            {
              success: true,
              message: "Login successful",
            },
            { status: 200 }
          );
        } catch (error) {
          console.error("Login Error:", error);

          return Response.json(
            {
              success: false,
              message: "An error occurred during login.",
            },
            { status: 500 }
          );
        }
      },
    },
  },
});

export interface LoginPatientInput {
  email: string;
  password: string;
}

export const loginPatientSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required"),
});

function RouteComponent() {

  const { data, mutate, isPending } = useMutation({
    mutationFn: (payload: LoginPatientInput) => {
      return fetch("/login/patient/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((res) => res.json());
    },
  });

  const formik = useFormik<LoginPatientInput>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginPatientSchema,
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
          src="/login/login.png"
          alt="Login as Patient"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="py-10 px-10 flex flex-col items-center">
        <div className="my-auto w-full max-w-[900px]">
          <h1 className="text-[32px] font-bold mb-6">Login as Patient</h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
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
            <fieldset className='mb-4'>
              <label htmlFor="password" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-destructive">{formik.errors.password}</p>
              )}
            </fieldset>
            {data?.success === false && <ErrorFeedback message={data.message} />}
            <Button isLoading={isPending} type='submit'>
              Login
            </Button>
            <p className='text-[#505c7e] text-center text-[14px] lg:text-[16px]'>
              Don't have an account?  <Link to="/register/patient" className='text-primary hover:underline'>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
