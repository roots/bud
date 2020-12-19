import type {Bud} from '@roots/bud-typings'
import type {Configuration} from 'webpack'

export default abstract class {
  /**
   * Bud reference
   */
  _bud: Bud.Ref

  /**
   * Mode
   */
  _mode: Configuration['mode']

  /**
   * CI enabled
   */
  _ci: boolean

  /**
   * Class constructor
   */
  public constructor(bud: Bud) {
    this._bud = bud.get
  }

  /**
   * Initialize service.
   */
  public init(): void {
    return
  }

  public get bud(): Bud {
    return this._bud()
  }

  public get mode(): Configuration['mode'] {
    return this._mode
  }

  public set mode(mode: Configuration['mode']) {
    this.mode = mode
  }

  public get ci(): boolean {
    return this._ci
  }

  public set ci(ci: boolean) {
    this.ci = ci
  }

  public abstract get(): Configuration['mode']

  public abstract set(mode: Configuration['mode']): void

  public abstract is(check: Configuration['mode']): boolean
}
