import { useState } from 'react'
import { Logo, ChevronDownIcon, MenuIcon, CloseIcon } from './Icons'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '#services' },
    { label: 'FAQs', href: '/#faqs' },
]

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="w-full sticky top-0 z-50">
            {/* Main nav */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-[72px]">
                    <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="BlueCare Home">
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            Blue<span className="text-primary">Care</span>
                        </span>
                    </a>

                    {/* Desktop links */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-primary hover:bg-primary-light transition-all duration-200"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="/login"
                            className="px-5 py-3 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary-light transition-all duration-200"
                        >
                            Log In
                        </a>
                        <a
                            href="/register"
                            className="px-5 py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all duration-200"
                        >
                            Book Appointment
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-100 shadow-lg animate-fade-in-up">
                    <ul className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="block px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="px-4 pb-4 flex flex-col gap-2.5">
                        <a
                            href="/login"
                            className="w-full text-center px-5 py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary-light transition-colors"
                        >
                            Log In
                        </a>
                        <a
                            href="/register"
                            className="w-full text-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            )}
        </header>
    )
}
