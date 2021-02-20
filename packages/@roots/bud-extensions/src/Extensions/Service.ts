import {Webpack} from '@roots/bud-support'
import {Service} from '@roots/bud-framework'
import type {Extensions} from '@roots/bud-typings'

export default abstract class
  extends Service
  implements Extensions {
  public abstract add(name, extension): void

  public abstract make(plugin: string): Webpack.Plugin

  public abstract makeAll(): Webpack.Plugin[]

  public abstract use(pkg: string): this
}
