import './interface'

import {Framework} from '@roots/bud-framework'

import * as Plugin from './criticalcss'

export const name: Framework.Module['name'] =
  '@roots/bud-criticalcss'

export * as api from './api'

export const boot: Framework.Module['boot'] = ({extensions}) =>
  extensions.add(Plugin)
