import type {Bud} from '@roots/bud-framework'

import Base from '../shared/base.js'

namespace Loader {
  export type ConstructorOptions = string
}

/**
 * Bud Loader
 *
 * @public
 */
export default class Loader extends Base {
  protected declare _app: () => Bud
  /**
   * Factory returning the loader path
   *
   * @public
   */
  public src: string | ((app: Bud) => string)

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

  public getSrc() {
    return this.unwrap(this.src)
  }

  public setSrc(src: string | ((app: Bud) => string)) {
    this.src = this.wrap(src)
    return this
  }
}
