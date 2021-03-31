import './interface'

import {Framework} from '@roots/bud-framework'

import * as Plugin from './imagemin'

export const name: Framework.Module['name'] =
  '@roots/bud-imagemin'

export * as api from './api'

export const boot: Framework.Module['boot'] = ({extensions}) =>
  extensions.add(Plugin)
