/**
 * Client options
 * @public
 */
let data: Options = {
  timeout: 20 * 1000,
  reload: true,
  name: `default`,
  debug: true,
  log: true,
  path: `/__bud/hmr`,
  indicator: true,
  overlay: true,
}

/**
 * Set client option
 * @public
 */
const set = (overrides: Options) => {
  data = {
    ...data,
    ...overrides,
  }
}

/**
 * Get client option
 * @public
 */
const get = (key?: string) => {
  return key ? data[key] : data
}

/**
 * Set client options based on URL parameters
 */
const setFromParameters = (query: string): void =>
  new window.URLSearchParams(query).forEach((value, key) => {
    const normalized =
      value === `true` ? true : value === `false` ? false : value
    data[key] = normalized
  })

export {data, get, setFromParameters, set}
