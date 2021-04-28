import './interface'
import {Plugin} from '@roots/wordpress-dependencies-webpack-plugin'
import type {Module} from '@roots/bud-framework'

// extension identifier
export const name: Module['name'] =
  '@roots/wordpress-dependencies-webpack-plugin'

// @roots/wordpress-externals-webpack-plugin
export const make: Module.Make<Plugin> = () => new Plugin()
