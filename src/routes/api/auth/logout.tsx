import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/auth/logout')({
    component: RouteComponent,
    server: {
        handlers: {
            POST: async ({ request }) => {
                try {
                    // Get the session cookie
                    const cookies = request.headers.get('cookie') || ''
                    const sessionCookie = cookies.split(';').find(c => c.trim().startsWith('session='))

                    if (sessionCookie) {
                        const sessionId = sessionCookie.split('=')[1]

                        // Delete session from database
                        // await deleteCookie(sessionId)
                    }
                    
                    return new Response(null, {
                        status: 302,
                        headers: {
                            Location: "/",
                            "Set-Cookie":
                                "session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0",
                        },
                    });
                } catch (error) {
                    console.error('Logout error:', error)
                    return Response.json({ message: 'Logout error' })
                }
            },
        },
    }
})

function RouteComponent() {
    return <div>Hello "/api/auth/logout"!</div>
}
