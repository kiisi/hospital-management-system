import { PlayIcon, CheckCircleIcon } from './Icons'

const stats = [
  { value: '5k+', label: 'Happy Patients' },
  { value: '200+', label: 'Expert Doctors' },
  { value: '50+', label: 'Specialties' },
]

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50/40 to-primary-light overflow-hidden" id="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h1 className="text-[32px] lg:text-[48px] font-bold leading-[120%] text-gray-900 font-jarkata">
              See a Doctor{' '}
              <span className="text-primary relative">
                Anytime,
                {' '}
              </span>
              and{' '}
              <span className="text-primary relative">
                Anywhere
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg">
              Premium healthcare at your fingertips. Book appointments, consult specialists, and manage your well-being — one platform, endless convenience
            </p>
            <div className="mt-8 flex flex-wrap flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 justify-center"
              >
                Book an Appointment
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-gray-700 text-primary border-[1px] border-primary rounded-[16px] transition-all duration-200 rounded-xl justify-center"
              >
                <PlayIcon />
                Watch How It Works
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircleIcon />
                <span>24/7 Access</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircleIcon />
                <span>Board-Certified Doctors</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="/images/hero-doctor.png"
                alt="Professional doctor ready for consultation"
                className="w-full h-auto object-cover rounded-3xl"
                width="560"
                height="620"
                loading="eager"
              />
              {/* Floating card top */}
              <div className="absolute top-6 -left-4 sm:-left-8 bg-white rounded-xl shadow-xl shadow-black/8 px-4 py-3 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg font-bold shrink-0">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Online Consultation</p>
                  <p className="text-xs text-gray-400">Connect in minutes</p>
                </div>
              </div>
              {/* Floating card bottom */}
              <div className="absolute bottom-10 -right-2 sm:-right-6 bg-white rounded-xl shadow-xl shadow-black/8 px-4 py-3 flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg shrink-0">
                  📅
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Easy Scheduling</p>
                  <p className="text-xs text-gray-400">Book anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
