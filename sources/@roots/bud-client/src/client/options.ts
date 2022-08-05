let options: Options = {
  timeout: 20 * 1000,
  reload: true,
  name: 'bud',
  debug: true,
  log: true,
  path: '/__bud/hmr',
  indicator: true,
  overlay: true,
}

export const set = (overrides: Options) =>
  Object.assign(options, overrides)

export const get = () => options

export const parseURLParameters = (query: string): Options =>
  Object.entries(new URLSearchParams(query)).reduce(
    (a: Options, [k, v]: [keyof Options, any]) => {
      if (v === 'true') v = true
      if (v === 'false') v = false
      return {...a, [k]: v}
    },
    options,
  )

export {options}
