import './interface'
import {Module} from '@roots/bud-extensions'
import {Plugin} from '@roots/entrypoints-webpack-plugin'

const extension: Module<Plugin, null> = {
  name: '@roots/bud-entrypoints',
  make: () => new Plugin(),
}

export default extension
export const {name, make} = extension
