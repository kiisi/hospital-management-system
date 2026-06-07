const services = [
  {
    title: '24/7 Primary Care',
    description:
      'Access primary care physicians around the clock for non-emergency health concerns and routine checkups.',
    image: '/images/primary-care.png',
  },
  {
    title: 'E-Pharmacy',
    description:
      'Get prescriptions filled and delivered right to your door with our integrated pharmacy services.',
    image: '/images/pharmacy.png',
  },
  {
    title: 'Urgent Care On-Demand',
    description:
      'Connect with urgent care providers for immediate medical attention when you need it most.',
    image: '/images/urgent-care.png',
  },
  {
    title: 'Weight Loss Program',
    description:
      'Personalized weight management programs with expert guidance and ongoing support.',
    image: '/images/consultation.png',
  },
  {
    title: 'Lab Testing',
    description:
      'Comprehensive lab testing services with convenient locations and fast results.',
    image: '/images/primary-care.png',
  },
  {
    title: 'Mental Health & Wellness',
    description:
      'Access therapists and psychiatrists for counseling, therapy, and medication management.',
    image: '/images/consultation.png',
  },
]

export function Services() {
  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-[20px] lg:px-[64px] py-[70px] lg:py-[100px] font-sans" id="services">
      <header className="text-center mb-[40px] max-w-[756px] mx-auto">
        <p className="text-[14px] lg:text-[18px]">Our Services</p>
        <h1 className="text-[30px] lg:text-[40px] font-bold font-mont leading-[125%] mb-2">
          Explore Our <span className="text-[#346ED6]">Services</span>
        </h1>
        <p className="text-[14px] lg:text-[16px] text-[#505673]">
          From your phone, computer, or nearest clinic. Mobihealth delivers round-the-clock telehealth care with instant access to your personal health records, wherever you are.
        </p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[24px] lg:gap-[32px]">
        {
          services.map((item, index) => {
            return (
              <div key={index} className="border-[.5px] rounded-[16px] border-[#e0e2e7] overflow-hidden flex flex-col">
                <figure className="translate-y-[-1px]">
                  <img src={item.image} alt={item.title} className="h-[270px] w-full object-cover" />
                </figure>
                <div className="p-[24px] flex-1 flex flex-col">
                  <h2 className="font-mont text-[18px] md:text-[18px] lg:text-[24px] font-bold mb-[16px]">
                    {item.title}
                  </h2>
                  <p className="text-[14px] lg:text-[16px] text-[#505673] mb-[16px]">
                    {item.description}
                  </p>
                  <div className="flex justify-end mt-auto">
                    <a
                      href="/login"
                      className="text-primary semibold flex items-center leading-[100%]"
                    >
                      Explore
                      <svg className="mt-[2px]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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
  )
}
