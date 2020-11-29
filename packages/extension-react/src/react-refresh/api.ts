import type {API} from '../types'

export const reactRefresh: API.ReactRefresh = function (
  options,
) {
  this.extensions
    .get('@pmmmwh/react-refresh-webpack-plugin')
    .setStore(options)

  return this
}
