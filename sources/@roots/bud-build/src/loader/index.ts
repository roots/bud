import type {Bud} from '@roots/bud-framework'

import Registrable from '@roots/bud-build/helpers/registrable'

/**
 * Bud Loader
 */
class Loader extends Registrable {
  /**
   * Factory returning the loader path
   */
  public src: string

  /**
   * Class constructor
   *
   * @param src - Either a factory returning a string or a literal string
   */
  public constructor(
    public override _app: () => Bud,
    src?: string,
    definition?: string,
  ) {
    super(_app)
    this._app = _app
    this.src = definition ?? src ?? ``
  }

  public getSrc(): string {
    return this.src
  }

  public setSrc(src: string) {
    this.src = src
    return this
  }
}

export {Loader as default}
