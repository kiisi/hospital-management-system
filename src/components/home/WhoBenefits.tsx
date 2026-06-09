import { HeartPulseIcon, UsersIcon, StethoscopeIcon, ShieldCheckIcon } from './Icons'

const beneficiaries = [
  {
    icon: HeartPulseIcon,
    title: 'Individuals & Families',
    description:
      'Convenient access to healthcare for busy individuals and families seeking quality care on their schedule.',
    image: '/images/consultation.png',
  },
  {
    icon: UsersIcon,
    title: 'Employers & HR Teams',
    description:
      'Comprehensive employee health programs that reduce absenteeism and improve workforce wellness.',
    image: '/images/primary-care.png',
  },
  {
    icon: StethoscopeIcon,
    title: 'Healthcare Providers',
    description:
      'Expand your practice reach with our telehealth platform and connect with patients virtually.',
    image: '/images/urgent-care.png',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Insurance Partners',
    description:
      'Streamlined digital health solutions that reduce costs and improve patient outcomes for payers.',
    image: '/images/pharmacy.png',
  },
]

export function WhoBenefits() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-[40px] max-w-[756px] mx-auto">
          <p className="text-[14px] lg:text-[18px]">Who We Serve</p>
          <h1 className="text-[30px] lg:text-[40px] font-bold font-mont leading-[125%] mb-2">Who <span className="text-[#346ED6]">Benefits</span> from BlueCare?</h1>
          <p className="text-[14px] lg:text-[16px] text-[#505673]">
            We support a wide variety of clients and partners from individuals looking for quality healthcare to businesses focused on employee wellness.
          </p>
        </header>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-[24px] lg:gap-[32px] xl:gap-[52px]">
          {
            beneficiaries.map((item, index) => {
              return (
                <div key={index} className="border-[.5px] rounded-[12px] border-[#e0e2e7] overflow-hidden flex flex-col">
                  <figure className="translate-y-[-1px]">
                    <img src={item.image} alt={item.title} className="h-[270px] w-full object-cover" />
                  </figure>
                  <div className="p-[24px] flex-1 flex flex-col">
                    <h2 className="font-mont lg:text-[18px] font-bold mb-[16px]">
                      {item.title}
                    </h2>
                    <p className="text-[#505673] text-[14px] mb-[16px]">
                      {item.description}
                    </p>
                    <div className="mt-auto">
                      <a
                        href={"/register"}
                        className="text-[#346ED6] semibold flex items-center"
                      >
                        Join us now!
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                          <path d="M8.33203 13.3333L11.3707 10.2946C11.5335 10.1318 11.5335 9.86804 11.3707 9.70534L8.33203 6.66654" stroke="#346ED6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
