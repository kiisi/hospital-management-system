import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/patient/settings"!</div>
}
