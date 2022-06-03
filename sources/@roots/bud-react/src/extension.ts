import {Extension} from '@roots/bud-framework'
import {
  bind,
  dependsOnOptional,
  label,
} from '@roots/bud-framework/extension/decorators'

import * as api from './react-refresh/api.js'

/**
 * React support extension for `@roots/bud`
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label('@roots/bud-react')
@dependsOnOptional([
  '@roots/bud-babel',
  '@roots/bud-esbuild',
  '@roots/bud-typescript',
])
export default class BudReact extends Extension {
  /**
   * Register extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.api.bindFacade('reactRefresh', api.reactRefresh)
  }

  /**
   * Boot extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    const preset = this.resolve('@babel/preset-react')
    this.app.babel.setPreset('@babel/preset-react', preset)
  }
}
