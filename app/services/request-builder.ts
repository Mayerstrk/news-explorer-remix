import { env } from 'environment-config'
import { z } from 'zod'
import { ApiErrorSchema } from '~/utils/errors'
import { ApiEndpoint, HttpMethod } from '~/utils/string-unions'

type HelperResult<R> =
  | {
      success: true
      response: R
    }
  | { success: false; response: z.infer<typeof ApiErrorSchema> }

export default function requestBuilder<
  R,
  T extends Record<string, unknown> = Record<string, never>,
>(
  endpoint: ApiEndpoint,
  {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
  }: { method?: HttpMethod; headers?: Record<string, string> } = {},
) {
  return async (body?: T): Promise<HelperResult<R>> => {
    try {
      const response = await fetch(`${env.API_URL + endpoint}`, {
        method,
        headers,
        body: method != 'GET' && body ? JSON.stringify(body) : undefined,
      })

      const parsedResponse = await response.json()

      if (!response.ok) {
        const validation = ApiErrorSchema.safeParse(parsedResponse)
        if (validation.success) {
          return {
            success: false,
            response: parsedResponse,
          }
        }
        console.error('Response not of expected shape')
        throw new Error('Response not of expected shape', {
          cause: validation.error,
        })
      }

      return { success: true, response: parsedResponse }
    } catch (caught) {
      if (caught instanceof z.ZodError) {
        const validationError = new Error('Response not of expected shape', {
          cause: caught,
        })
        console.error(validationError.message, validationError.cause)
      }

      throw caught instanceof Error
        ? caught
        : new Error('Request failed', { cause: caught })
    }
  }
}
