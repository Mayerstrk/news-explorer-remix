const regex = new RegExp('^/([^/?]+)')

export function sameFirstSegment(url1: string, url2: string): boolean {
  return regex.exec(url1)?.[1] === regex.exec(url2)?.[1]
}

export function extractTokenFromSetCookieHeader(setCookieHeader: string) {
  const tokenPrefix = 'token='
  return setCookieHeader
    .split(',')
    .map((part) => part.trim())
    .find((part) => part.startsWith(tokenPrefix))
    ?.substring(tokenPrefix.length)
    .split(';')[0]
}
