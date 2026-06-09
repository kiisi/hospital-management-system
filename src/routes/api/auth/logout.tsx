import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/auth/logout')({
    server: {
        handlers: {
            POST: async ({ request }) => {
                try {
                    // Get the session cookie
                    const cookies = request.headers.get('cookie') || ''
                    const sessionCookie = cookies.split(';').find(c => c.trim().startsWith('session='))

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
