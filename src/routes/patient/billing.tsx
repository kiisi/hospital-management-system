import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/billing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/patient/billing"!</div>
}
