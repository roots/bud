import {Extension} from './interface'
import {Plugin} from '@roots/entrypoints-webpack-plugin'

const extension: Extension = {
  name: '@roots/bud-entrypoints',
  make: () => new Plugin(),
}

export default extension
export const {name, make} = extension
