import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register/doctor/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/login/doctor/login"!</div>
}
