import './interface'
import {Framework, Module} from '@roots/bud-framework'

import * as terserWebpackPlugin from './terser-webpack-plugin'

// Extension name
export const name: Module['name'] = '@roots/bud-terser'

// Extension config api
export * as api from './api'

// Extension boot
export const boot: Module.Boot = ({extensions}: Framework) => {
  extensions.add(terserWebpackPlugin)
}
