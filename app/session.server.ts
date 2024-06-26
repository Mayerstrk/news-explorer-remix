import { createCookieSessionStorage } from '@vercel/remix'
import { env } from 'environment-config'

type SessionData = {
  username: string | null
  token: string | null
}

type SessionFlashData = {
  error: string
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'session',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secrets: [env.COOKIE_SECRET],
    },
  })
