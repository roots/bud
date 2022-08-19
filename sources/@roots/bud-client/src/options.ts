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
const set = (overrides: Options) => Object.assign(data, overrides)

/**
 * Get client option
 * @public
 */
const get = (key?: string) => (key ? data[key] : data)

/**
 * Set client options based on URL parameters
 */
const setFromParameters = (query: string): Options =>
  (data = Object.entries(new URLSearchParams(query)).reduce(
    (a: Options, [k, v]: [keyof Options, any]) => {
      if (v === `true`) v = true
      if (v === `false`) v = false
      return {...a, [k]: v}
    },

    data,
  ))

export {data, get, setFromParameters, set}
