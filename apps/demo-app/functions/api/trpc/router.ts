import { initTRPC } from '@trpc/server'

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create()

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure

interface User {
  id: number
  name: string
  username: string
  email: string
}

export const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')

      if (!response.ok) { throw new Error('Failed to fetch users from API') }

      const users: User[] = await response.json()
      return users
    }),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
