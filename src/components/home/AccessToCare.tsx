import { ArrowRightIcon } from './Icons'

const accessCards = [
  {
    tag: 'TELEHEALTH PROGRAM',
    title: 'Virtual Visits from Anywhere',
    description:
      'Connect with healthcare providers through secure video consultations from the comfort of your home.',
    image: '/images/phone-mockup.png',
  },
  {
    tag: 'IN-PERSON CARE',
    title: 'Find a Provider or Primary Clinic',
    description:
      'Locate nearby clinics and healthcare providers for in-person visits and comprehensive care.',
    image: '/images/consultation.png',
  },
  {
    tag: 'LAB & DIAGNOSTICS',
    title: 'Laboratory & Diagnostics',
    description:
      'Access comprehensive lab testing and diagnostic services at convenient locations near you.',
    image: '/images/primary-care.png',
  },
]

export function AccessToCare() {
  return (
    <div>

      <div className="relative w-full max-w-[1440px] mx-auto px-[20px] lg:px-[64px] py-[70px] font-sans">
        <header className="text-center mb-[40px] max-w-[756px] mx-auto">
          <p className="lg:text-[18px]">Healthcare Access</p>
          <h1 className="text-[32px] lg:text-[40px] font-bold font-mont leading-[125%]">Expanding <span className="text-[#346ED6]">Access to Care</span></h1>
          <p className="text-[14px] lg:text-[16px] text-[#505673]">
            Whether virtual or in-person, we make it easy for you to access the care you need.
          </p>
        </header>
        <div className="grid gap-[24px] lg:gap-[32px]">
          {
            accessCards.map((item, index) => {
              return (
                <div key={index} className="rounded-[16px] overflow-hidden flex flex-col grid lg:grid-cols-[0.8fr_1fr] gap-4 lg:gap-0 bg-[#f7f8fA] rounded-[2px] relative">
                  <div className="absolute left-[-24px] top-[24px] h-[80px] w-[80px] grid place-items-center leading-[100%] text-white bg-[#346ED6] text-[32px] rounded-full">
                    0{index + 1}
                  </div>
                  <figure>
                    <img src={item.image} alt={item.title} className="h-[320px] w-full object-cover" />
                  </figure>
                  <div className="p-[24px] flex-1 flex flex-col">
                    <div className='my-auto'>
                      <span className="inline-block self-start px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-primary bg-primary-light rounded-full mb-4">
                        {item.tag}
                      </span>
                      <h2 className="font-mont text-[16px] md:text-[18px] lg:text-[24px] font-bold mb-[16px]">
                        {item.title}
                      </h2>
                      <p className="text-[#505673] text-[12px] lg:text-[16px] mb-[24px] max-w-[560px]">
                        {item.description}
                      </p>
                      <div>
                        <a
                          href={'/login'}
                          className="text-[#346ED6] font-semibold flex items-center"
                        >
                          Explore Now
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M8.33203 13.3333L11.3707 10.2946C11.5335 10.1318 11.5335 9.86804 11.3707 9.70534L8.33203 6.66654" stroke="#346ED6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
