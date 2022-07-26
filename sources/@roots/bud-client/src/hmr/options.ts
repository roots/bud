import type {Options} from '.'

let options: Options = {
  path: '/__bud/hmr',
  timeout: 20 * 1000,
  reload: false,
  name: 'bud',
}

export const set = (overrides: Options) =>
  Object.assign(options, overrides)

export const get = () => options
