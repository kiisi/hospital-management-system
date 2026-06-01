import { Input } from '@/components/ui/Input'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/login/doctor/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <figure className='h-full w-full hidden lg:block'>
        <img
          src="/register/register.png"
          alt="Login as Doctor"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="py-10 px-10 flex flex-col items-center">
        <div className="my-auto w-full max-w-[900px]">
          <h1 className="text-[32px] font-bold mb-6">Login as Doctor</h1>
          <form className="flex flex-col gap-4 w-full">
            <fieldset>
              <label htmlFor="email" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </fieldset>
            <fieldset className='mb-4'>
              <label htmlFor="password" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </fieldset>
            <button
              className='bg-primary h-[48px] w-full rounded-xl text-white'
            >
              Login
            </button>
            <p className='text-[#505c7e] text-center text-[14px] lg:text-[16px]'>
              Don't have an account?  <Link to="/register/doctor" className='text-primary hover:underline'>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
