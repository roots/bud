import type {Extensions} from '@roots/bud-typings'
import {Framework, Service} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

export default abstract class
  extends Service
  implements Extensions {
  public abstract add(extension): void

  public abstract make(): Webpack.WebpackPluginInstance[]

  public abstract use(pkg: string): this

  public abstract discard(pkg: string): Framework
}
