export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#0052CC" />
      <path
        d="M12 14h6v4h4v-4h6v12h-6v-4h-4v4h-6V14z"
        fill="white"
      />
    </svg>
  )
}

export function PlayIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#0052CC" />
      <polygon points="8,6 15,10 8,14" fill="white" />
    </svg>
  )
}

export function CheckCircleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#0052CC" strokeWidth="2" />
      <path d="M6 10l3 3 5-5" stroke="#0052CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0l2.35 4.76 5.25.77-3.8 3.7.9 5.24L8 12.18l-4.7 2.47.9-5.24-3.8-3.7 5.25-.77L8 0z" />
    </svg>
  )
}

export function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 3a1 1 0 011-1h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 4h16v12H2V4zm0 0l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MapPinIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 18s-6-5.686-6-10A6 6 0 0116 8c0 4.314-6 10-6 10z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M18.9 0H1.1C.5 0 0 .5 0 1.1v17.8c0 .6.5 1.1 1.1 1.1h9.6v-7.7H8.1V9.2h2.6V7c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.3.1v2.7h-1.6c-1.3 0-1.5.6-1.5 1.5v1.9h3l-.4 3.1h-2.6V20h5.1c.6 0 1.1-.5 1.1-1.1V1.1c0-.6-.5-1.1-1.1-1.1z" />
    </svg>
  )
}

export function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.58 1.49-1.3 2.04-2.13-.74.33-1.53.55-2.36.65.85-.51 1.5-1.31 1.8-2.27-.79.47-1.67.81-2.6.99C16.1 2.5 15.07 2 13.92 2c-2.2 0-3.99 1.79-3.99 3.99 0 .31.04.62.1.92-3.31-.17-6.24-1.75-8.21-4.16-.34.59-.54 1.27-.54 2 0 1.38.7 2.6 1.77 3.32-.66-.02-1.27-.2-1.81-.5v.05c0 1.93 1.38 3.55 3.2 3.91-.33.09-.69.14-1.05.14-.26 0-.51-.03-.75-.07.51 1.58 1.98 2.73 3.73 2.76-1.37 1.07-3.09 1.71-4.96 1.71-.32 0-.64-.02-.95-.06 1.77 1.13 3.87 1.79 6.13 1.79" />
    </svg>
  )
}

export function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M18.5 0h-17C.67 0 0 .67 0 1.5v17c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-17C20 .67 19.33 0 18.5 0zM6 17H3V7.5h3V17zM4.5 6.3c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM17 17h-3v-4.7c0-1.1 0-2.6-1.6-2.6-1.6 0-1.8 1.2-1.8 2.5V17H7.5V7.5h2.8v1.3c.4-.8 1.4-1.6 2.8-1.6 3 0 3.5 2 3.5 4.5V17z" />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1.8c2.67 0 2.99.01 4.04.06 2.08.09 3.05 1.07 3.15 3.15.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.1 2.07-1.07 3.05-3.15 3.15-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-2.09-.1-3.05-1.08-3.15-3.15-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.1-2.08 1.07-3.05 3.15-3.15C7.01 1.81 7.33 1.8 10 1.8zM10 0C7.28 0 6.94.01 5.88.06 2.96.2.2 2.96.06 5.88.01 6.94 0 7.28 0 10s.01 3.06.06 4.12c.14 2.92 2.9 5.68 5.82 5.82C6.94 19.99 7.28 20 10 20s3.06-.01 4.12-.06c2.91-.14 5.68-2.9 5.82-5.82.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12C19.8 2.97 17.04.2 14.12.06 13.06.01 12.72 0 10 0zm0 4.86a5.14 5.14 0 100 10.28 5.14 5.14 0 000-10.28zm0 8.47a3.33 3.33 0 110-6.67 3.33 3.33 0 010 6.67zm5.34-8.67a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
    </svg>
  )
}

export function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M19.59 3.6c-.23-.87-.91-1.55-1.78-1.78C16.25 1.4 10 1.4 10 1.4s-6.25 0-7.81.37C1.32 2 .64 2.73.41 3.6.04 5.16.04 10 .04 10s0 4.84.37 6.4c.23.87.91 1.55 1.78 1.78 1.56.42 7.81.42 7.81.42s6.25 0 7.81-.42c.87-.23 1.55-.91 1.78-1.78.37-1.56.37-6.4.37-6.4s.04-4.84-.37-6.4zM8 13.5V6.5l5.2 3.5L8 13.5z" />
    </svg>
  )
}

export function HeartPulseIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1112 6.006a5 5 0 017.5 6.572" />
      <path d="M5 12h2l2-3 3 6 2-3h5" />
    </svg>
  )
}

export function ShieldCheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

export function UsersIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

export function VideoIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}

export function ActivityIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

export function StethoscopeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 0012 0V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
      <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  )
}

export function FlaskIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 9V3M14 9V3M8.5 14h7M5 21h14l-3.5-7h-7L5 21z" />
    </svg>
  )
}

export function AppleIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
      <path d="M16.52 12.69c-.03-2.83 2.31-4.19 2.42-4.26-1.32-1.93-3.37-2.19-4.1-2.22-1.74-.18-3.41 1.03-4.3 1.03-.89 0-2.26-1-3.72-.97-1.91.03-3.68 1.11-4.66 2.83-1.99 3.45-.51 8.57 1.43 11.37.95 1.37 2.08 2.91 3.56 2.85 1.43-.06 1.97-.92 3.7-.92 1.73 0 2.22.92 3.73.89 1.54-.03 2.52-1.4 3.46-2.78 1.09-1.59 1.54-3.14 1.57-3.22-.03-.01-3-1.15-3.03-4.57zM13.72 4.38c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.33 1.71-.73.85-1.37 2.2-1.2 3.5 1.27.1 2.56-.65 3.35-1.59z" />
    </svg>
  )
}

export function GooglePlayIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor">
      <path d="M.55.13L11.27 11 .55 21.87C.2 21.52 0 20.98 0 20.31V1.69C0 1.02.2.48.55.13zM15.36 7.59L3.06.44l9.56 9.56 2.74-2.41zM3.06 21.56l12.3-7.15-2.74-2.41-9.56 9.56zM18.68 9.77l-2.59 1.51L13.17 11l2.92-2.72 2.59 1.49c.73.42.73 1.1 0 1.53l-.73-.53.73.53z" />
    </svg>
  )
}

export function ChevronDownIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
