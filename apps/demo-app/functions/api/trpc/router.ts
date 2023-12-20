import { initTRPC } from '@trpc/server'
import { ofetch } from 'ofetch'
import { defaulted, number, object } from 'superstruct'

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

interface Product {
  id: number
  title: string
  description: string
  price: string
  thumbnail: string
}

interface APIProductResponse {
  products: Product[]
}

export const appRouter = router({
  productList: publicProcedure
    .input(object({ page: defaulted(number(), 1) }))
    .query(async ({ input }) => {
      const requestUrl = new URL('https://dummyjson.com/products')

      const limit = 10
      const skip = (input.page - 1) * limit

      requestUrl.searchParams.set('limit', limit.toString())
      requestUrl.searchParams.set('skip', skip.toString())

      const { products } = await ofetch<APIProductResponse>(requestUrl.toString())

      return products
    }),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
