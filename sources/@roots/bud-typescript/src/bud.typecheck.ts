import {Bud} from '@roots/bud-framework'
import {Container} from '@roots/container'

import * as BudTypeCheckPlugin from './fork-ts-checker-webpack-plugin'

/**
 * fork-ts-webpack-plugin options callback
 *
 * @remarks
 * Passed the registered fork-ts-checker-webpack-plugin options
 * It is expected to return replacement options.
 *
 * @public
 */
interface OptionsMutator {
  (
    options: Container<BudTypeCheckPlugin.Options>,
  ): BudTypeCheckPlugin.Options
}

type Options = OptionsMutator | BudTypeCheckPlugin.Options | boolean

export interface typecheck {
  (this: Bud, options?: Options): Promise<Bud>
}

export interface facade {
  (this: Bud, options?: Options): Bud
}

export const typecheck: typecheck = async function (this: Bud, options?) {
  /**
   * Explicitly passing false will remove the extension
   * if it is registered
   */
  if (options === false) {
    this.extensions.has('fork-ts-checker-webpack-plugin') &&
      this.extensions.remove('fork-ts-checker-webpack-plugin')

    return this
  }

  /**
   * For true, no params, or a mutational parameter
   * we want the extension.
   */
  await this.extensions.add(BudTypeCheckPlugin)

  /**
   * No options is the same as passing true.
   * It implicitly enables the plugin.
   */
  if (!options || options === true) return this

  /**
   * If there were options passed and they are
   * a callback we'll pass the function to the extension
   * controllers `mutateOptions` method.
   */
  if (typeof options === 'function') {
    this.extensions
      .get('fork-ts-checker-webpack-plugin')
      .mutateOptions(options)

    return this
  }

  /**
   * If we haven't exited this function yet but there
   * are still options it means we should treat it
   * as an object.
   */
  this.extensions.get('fork-ts-checker-webpack-plugin').setOptions(options)

  return this
}
