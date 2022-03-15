import {Framework, Loader as Contract} from '@roots/bud-framework'

import {Base} from '../shared/Base'

export namespace Loader {
  export type ConstructorOptions = string
}

/**
 * Framework Loader
 *
 * @public
 */
export class Loader extends Base implements Contract {
  /**
   * Factory returning the loader path
   *
   * @public
   */
  public src: string | ((app: Framework) => string)

  public getSrc() {
    return this.unwrap(this.src)
  }

  public setSrc(src: string | ((app: Framework) => string)) {
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
  public constructor(_app: () => Framework, src: string) {
    super(_app)
    this.src = src
  }
}
