import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/patient/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/login/patient/login"!</div>
}
