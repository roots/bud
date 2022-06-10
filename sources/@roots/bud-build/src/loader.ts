import {Bud, Build} from '@roots/bud-framework'

import Base from './shared/base.js'

namespace Loader {
  export type ConstructorOptions = string
}

/**
 * Bud Loader
 *
 * @public
 */
export default class Loader extends Base implements Build.Loader {
  /**
   * Factory returning the loader path
   *
   * @public
   */
  public src: string | ((app: Bud) => string)

  public getSrc() {
    return this.unwrap(this.src)
  }

  public setSrc(src: string | ((app: Bud) => string)) {
    this.src = this.wrap(src)
    return this
  }

  /**
   * Class constructor
   *
   * @param src - Either a factory returning a string or a literal string
   *
   * @public
   */
  public constructor(_app: () => Bud, src: string) {
    super(_app)
    this.src = src
  }
}
