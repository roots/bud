import type {Framework, Webpack} from '@roots/bud-typings'

export default abstract class {
  /**
   * Bud reference
   */
  _bud: () => Framework

  /**
   * Mode
   */
  _mode: Webpack.Configuration['mode']

  /**
   * CI enabled
   */
  _ci: boolean

  /**
   * Class constructor
   */
  public constructor(bud: Framework) {
    this._bud = bud.get
  }

  /**
   * Initialize service.
   */
  public init(): void {
    return
  }

  public get bud(): Framework {
    return this._bud()
  }

  public get mode(): Webpack.Configuration['mode'] {
    return this._mode
  }

  public set mode(mode: Webpack.Configuration['mode']) {
    this._mode = mode
  }

  public get ci(): boolean {
    return this._ci
  }

  public set ci(ci: boolean) {
    this._ci = ci
  }

  public abstract get(): Webpack.Configuration['mode']

  public abstract set(mode: Webpack.Configuration['mode']): void

  public abstract is(
    check: Webpack.Configuration['mode'],
  ): boolean
}
