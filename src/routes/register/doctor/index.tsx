import { Input } from '@/components/ui/Input'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/register/doctor/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [formData, setFormData] = useState({
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
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log('Doctor registration data:', formData)
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

          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset>
                <label htmlFor="firstName" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </fieldset>

              <fieldset>
                <label htmlFor="lastName" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
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
                value={formData.email}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <label htmlFor="phone" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
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
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </fieldset>

              <fieldset>
                <label htmlFor="specialization" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  Specialization
                </label>
                <select
                  id="specialization"
                  className="flex h-[48px] w-full rounded-xl border border-gray-200/80 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50 px-4 py-2 placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all leading-[100%]"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
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
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                />
              </fieldset>

              <fieldset>
                <label htmlFor="yearsOfExperience" className="inline-block mb-1 text-sm font-medium text-gray-900">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  id="yearsOfExperience"
                  placeholder="Enter years of experience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                  max="60"
                  required
                />
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset className='mb-4'>
              <label htmlFor="confirmPassword" className="inline-block mb-1 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </fieldset>

            <button
              type="submit"
              className='bg-primary h-[48px] w-full rounded-xl text-white hover:opacity-90 transition-opacity'
            >
              Register as Doctor
            </button>
            <p className='text-[#505c7e] text-center text-[14px] lg:text-[16px]'>
              Already have an account?  <Link to='/login/doctor' className='text-primary hover:underline'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}