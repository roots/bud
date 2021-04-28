import {
  Extensions,
  Framework,
  Module,
  Service,
} from '@roots/bud-framework'
import type Webpack from 'webpack/types'

export default abstract class
  extends Service
  implements Extensions {
  public abstract add(extension: Module): void

  public abstract make(): Webpack.WebpackPluginInstance[]

  public abstract discard(pkg: string): Framework
}
