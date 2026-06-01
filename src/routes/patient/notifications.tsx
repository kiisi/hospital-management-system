import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/patient/notifications"!</div>
}
