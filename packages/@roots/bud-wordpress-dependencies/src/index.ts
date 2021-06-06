import './interface'
import {WordPressDependenciesWebpackPlugin as Plugin} from '@roots/wordpress-dependencies-webpack-plugin'
import {Module} from '@roots/bud-framework'

export const name: Module['name'] =
  '@roots/wordpress-dependencies-webpack-plugin'

export const make: Module.Make<Plugin, null> = () => new Plugin()
