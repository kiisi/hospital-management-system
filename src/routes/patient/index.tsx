import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/')({
  // beforeLoad: ({ context }) => {
  //   if (context.auth.user?.role !== 'patient') {
  //     throw redirect({ to: '/login' })
  //   }
  // },
  component: PatientLayout,
})

function PatientLayout() {
  return (
    <div className="patient-portal-layout">
      <nav>🏥 Patient Health Hub Menu (My Chart, Bill Pay)</nav>
      <main>
        Opp
      </main>
    </div>
  )
}
