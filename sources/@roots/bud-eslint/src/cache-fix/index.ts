import {deprecated} from '@roots/bud-support/decorators'

/**
 * Persistent cache fix for eslint
 *
 * @deprecated This is no longer necessary. There was a fix upstream.
 */
export default class BudEslintCacheFix {
  /**
   * @deprecated This is no longer necessary. There was a fix upstream.
   */
  @deprecated(
    `bud.eslint.cachefix`,
    `This function is no longer needed and should be removed.`,
  )
  public enable(...params: Array<any>) {
    return this
  }
}
