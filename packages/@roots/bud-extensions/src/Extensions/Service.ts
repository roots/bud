import type {Extensions} from '@roots/bud-typings'
import type {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack/types'

import {Service} from '@roots/bud-framework'

export default abstract class
  extends Service
  implements Extensions {
  public abstract add(extension): void

  public abstract make(): Webpack.WebpackPluginInstance[]

  public abstract use(pkg: string): this

  public abstract discard(pkg: string): Framework
}
