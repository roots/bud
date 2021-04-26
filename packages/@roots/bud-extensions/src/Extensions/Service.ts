import type {Extensions, Module} from '@roots/bud-typings'
import type {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack/types'

import {Service} from '@roots/bud-framework'

export default abstract class
  extends Service
  implements Extensions {
  public abstract add(extension: Module): void

  public abstract make(): Webpack.WebpackPluginInstance[]

  public abstract discard(pkg: string): Framework
}
