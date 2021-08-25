import type {
  Build as Contract,
  Framework,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import type * as Webpack from 'webpack'
declare class Build extends Service implements Contract {
  name: string
  loaders: Framework.Loaders
  rules: Framework.Rules
  items: Framework.Items
  bootstrap(): void
  /** @hidden */
  _config: Webpack.Configuration
  /**
   * {@link Webpack.Configuration}
   *
   * @readonly
   */
  get config(): Webpack.Configuration
  rebuild(): Webpack.Configuration
}
export {Build}
//# sourceMappingURL=index.d.ts.map
