import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/medical-records')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/patient/medical-records"!</div>
}
