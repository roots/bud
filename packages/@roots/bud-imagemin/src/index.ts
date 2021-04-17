import './interface'
import {Module} from '@roots/bud-framework'
import * as Plugin from './imagemin'

export const name: Module['name'] = '@roots/bud-imagemin'

export * as api from './api'

export const boot: Module['boot'] = ({extensions}) =>
  extensions.add(Plugin)
