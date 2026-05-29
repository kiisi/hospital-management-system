import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register/doctor/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/login/doctor/login"!</div>
}
