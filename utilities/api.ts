import { ParsedUrlQuery } from 'querystring'

/**
 * The ParamsQuery is parsed before toString() because Punk API
 * gives errors when params are passed empty
 *
 * TODO: move into separate folder
 */
export const cleanQueryParams = function (
  params: ParsedUrlQuery
): Record<string, string> {
  const results = Object.entries(params).reduce((cleanObject, [key, value]) => {
    if (value) {
      cleanObject[key as keyof ParsedUrlQuery] = value
        .toString()
        .trim()
        .replaceAll(' ', '_') as string
    }

    return cleanObject
  }, {} as Record<string, string>)

  return results
}

// TODO: move into separate folder
export const fetchBeers = function <T>(params?: ParsedUrlQuery): Promise<T> {
  let query = ''

  if (params) {
    query = new URLSearchParams(cleanQueryParams(params))?.toString()
  }

  const url: URL = new URL(`https://api.punkapi.com/v2/beers?${query}`)

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json() as Promise<T>
  })
}
