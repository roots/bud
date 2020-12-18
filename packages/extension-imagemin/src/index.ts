import type {Extension} from '@roots/bud-typings'

export type {Imagemin} from './imagemin/typings'

import * as ImageminPlugin from './imagemin'

export * as api from './api'

export const boot: Extension.Module.Boot = ({use}) =>
  use(['image-minimizer-webpack-plugin', ImageminPlugin])
