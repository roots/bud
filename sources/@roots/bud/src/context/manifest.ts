import type Config from './config'

/**
 * Context: project manifest
 *
 * @public
 */
export default class Manifest {
  public data: Record<string, any> = {}

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public config: Config) {
    if (!this.config.data[`package.json`]) return this
    this.data = this.config.data[`package.json`].module

    return this
  }
}
