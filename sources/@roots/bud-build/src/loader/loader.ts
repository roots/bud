import type {Bud} from '@roots/bud-framework'
import type {Loaders} from '@roots/bud-framework/src/types/services/build/registry'

import Base from '../shared/base.js'

/**
 * Bud Loader
 *
 * @public
 */
export default class Loader extends Base {
  /**
   * Factory returning the loader path
   *
   * @public
   */
  public src: `${keyof Loaders & string}`

  /**
   * Class constructor
   *
   * @param src - Either a factory returning a string or a literal string
   *
   * @public
   */
  public constructor(_app: () => Bud, src: string) {
    super(_app)
    this._app = _app
    this.src = src
  }

  public getSrc(): string {
    return this.src
  }

  public setSrc(src: string) {
    this.src = src
    return this
  }
}
