import { z } from 'zod'

const NewsApiErrorSchema = z.object({
  status: z.string(),
  code: z.string(),
  message: z.string(),
})

const DBApiErrorSchema = z.object({
  message: z.string(),
  status: z.number(),
  name: z.string(),
  cause: z.union([z.object({}).optional().nullable(), z.undefined()]),
})

export { DBApiErrorSchema, NewsApiErrorSchema }
