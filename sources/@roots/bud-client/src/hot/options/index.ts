/**
 * Client options
 */
const data: Record<string, any> = {
  debug: true,
  indicator: true,
  log: true,
  name: `@roots/bud-client`,
  overlay: true,
  path: `/bud/hot`,
  reload: true,
  timeout: 2000,
}

/**
 * Get client option
 */
const get = (name: `${keyof Options & string}`) => data[name]
const set = (name: `${keyof Options & string}`, value: any) => data[name] = value
/**
 * Set client data based on URL parameters
 */
const setFromParameters = (query: string): Options => {
  new window.URLSearchParams(query).forEach((value: any, key: any) => {
    data[key] =
      value === `true` ? true : value === `false` ? false : value
  })

  data[data.name] = {...data, ...data}

  return data[data.name]
}

export {data, get, set, setFromParameters}
