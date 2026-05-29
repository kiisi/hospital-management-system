import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register/patient/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/register/patient/login"!</div>
}
