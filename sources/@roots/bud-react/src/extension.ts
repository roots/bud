import {Extension} from '@roots/bud-framework'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

import * as api from './react-refresh/api.js'

/**
 * `BudReact` adds the `@babel/preset-react` preset to the babel configuration
 *
 * @remarks
 * `@roots/bud-babel` provides the babel configuration
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label('@roots/bud-react')
@dependsOn(['@roots/bud-babel'])
export default class BudReact extends Extension {
  /**
   * Register extension
   *
   * @remarks
   * Binding the reactRefresh api to the bud api.
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
   * @remarks
   * Adding the babel preset react to the babel config.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    const preset = await this.resolve('@babel/preset-react')
    this.app.babel.setPreset('@babel/preset-react', preset)
  }
}
