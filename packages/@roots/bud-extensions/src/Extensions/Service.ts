import {Webpack} from '@roots/bud-support'
import {Service} from '@roots/bud-framework'
import type {Extensions} from '@roots/bud-typings'

export default abstract class
  extends Service
  implements Extensions {
  public abstract add(extension): void

  public abstract make(): Webpack.Plugin[]

  public abstract use(pkg: string): this

  public abstract discard(pkg: string): Service['app']
}
