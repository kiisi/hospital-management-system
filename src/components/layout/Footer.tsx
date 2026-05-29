import {
  Logo,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  YoutubeIcon,
} from './Icons'

const footerLinks = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Team', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'News & Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  services: [
    { label: 'Primary Care', href: '#' },
    { label: 'Urgent Care', href: '#' },
    { label: 'Telehealth', href: '#' },
    { label: 'Mental Health', href: '#' },
    { label: 'Lab Testing', href: '#' },
  ],
  patients: [
    { label: 'Patient Portal', href: '#' },
    { label: 'Book Appointment', href: '#' },
    { label: 'Insurance Info', href: '#' },
    { label: 'Billing & Payments', href: '#' },
    { label: 'FAQs', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'HIPAA Compliance', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
}

const socialLinks = [
  { Icon: FacebookIcon, label: 'Facebook', href: '#' },
  { Icon: TwitterIcon, label: 'Twitter', href: '#' },
  { Icon: LinkedInIcon, label: 'LinkedIn', href: '#' },
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
  { Icon: YoutubeIcon, label: 'YouTube', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20 pb-8">
        {/* Top */}
        <div className="grid lg:grid-cols-[1.2fr_2fr] gap-10 lg:gap-16 pb-10 border-b border-gray-800">
          {/* Brand */}
          <div>
            <a href="#" className="inline-flex items-center gap-2.5" aria-label="MediHealth Home">
              <span className="text-xl font-bold text-white tracking-tight">
                Blue<span className="text-blue-400">Care</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              Providing accessible, quality healthcare through innovative
              technology. Your health, our priority.
            </p>
            <div className="mt-6 space-y-3">
              <a href="tel:+18001234567" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                <PhoneIcon className="w-4 h-4 shrink-0 text-gray-500" />
                <span>(800) 123-4567</span>
              </a>
              <a href="mailto:info@medihealth.com" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                <MailIcon className="w-4 h-4 shrink-0 text-gray-500" />
                <span>info@medihealth.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPinIcon className="w-4 h-4 shrink-0 text-gray-500 mt-0.5" />
                <span>123 Health Ave, Medical City, MC 12345</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Patient Resources</h4>
              <ul className="space-y-2.5">
                {footerLinks.patients.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} MediHealth. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-200"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
