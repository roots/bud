import './interface'
import * as terserWebpackPlugin from './terser-webpack-plugin'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'

// Extension name
export const name: Module['name'] = '@roots/bud-terser'

// Extension config api
export * as api from './api'

// Extension boot
export const boot: Module.Boot = ({extensions}: Framework) => {
  extensions.add('terser-webpack-plugin', terserWebpackPlugin)
}
