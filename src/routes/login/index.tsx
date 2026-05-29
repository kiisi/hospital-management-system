import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <figure className='h-full w-full hidden lg:block'>
        <img
          src="/login/login.png"
          alt="Login as Patient or Doctor"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="py-10 px-10 flex flex-col -items-center">
        <div className="my-auto">
          <h1 className="text-[32px] font-bold font-mont">
            Login to Blue<span className="text-primary">Care</span>
          </h1>
          <p className="mb-10">Please select how you'd like to continue</p>
          <a
            href="/login/patient"
            className="mb-4 h-[48px] rounded-xl border-[1px] border-primary text-primary flex items-center justify-center"
          >
            Continue as a Patient
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
              <path d="M8.33203 13.3333L11.3707 10.2946C11.5335 10.1318 11.5335 9.86804 11.3707 9.70534L8.33203 6.66654" stroke="#346ED6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/login/doctor"
            className="h-[48px] rounded-xl bg-primary text-white flex items-center justify-center"
          >
            Continue as a Doctor
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
              <path d="M8.33203 13.3333L11.3707 10.2946C11.5335 10.1318 11.5335 9.86804 11.3707 9.70534L8.33203 6.66654" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
