import querystring from 'querystring'

import type {Options} from '.'

let options: Options = {
  timeout: 20 * 1000,
  reload: false,
  name: 'bud',
  path: '/__bud/hmr',
  indicator: true,
  overlay: true,
}

export const set = (overrides: Options) =>
  Object.assign(options, overrides)

export const get = () => options

export const parseQuery = (query: string): Options => {
  options = Object.entries(querystring.parse(query.slice(1))).reduce(
    (a: Options, [k, v]: [keyof Options, any]) => {
      if (v === 'true') v = true
      if (v === 'false') v = false
      return {...a, [k]: v}
    },
    options,
  )

  return options
}

export {options}
