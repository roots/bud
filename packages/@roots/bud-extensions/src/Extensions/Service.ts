import {Service} from '@roots/bud-framework'
import type {Extensions} from '@roots/bud-typings'
import type {Webpack} from '@roots/bud-support'

export default abstract class
  extends Service
  implements Extensions {
  public abstract add(extension): void

  public abstract make(): Webpack.Plugin[]

  public abstract use(pkg: string): this

  public abstract discard(pkg: string): Service['app']
}
