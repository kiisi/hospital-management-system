import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/doctor/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="doctor-portal-layout">
      <nav>🥼 Doctor Portal Sidebar (Schedules, Patients Link)</nav>
      <main>
        {/* Sub-pages like dashboard or appointments render here */}
        <Outlet /> 
      </main>
    </div>
  )
}