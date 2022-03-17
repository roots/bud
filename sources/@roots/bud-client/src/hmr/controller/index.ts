/* eslint-disable no-console */

import {bind} from 'helpful-decorators'

import {Options} from '../../options'
import {Payload} from '../interface'
import {accept} from './accept'
import {ModuleId} from './interface'

const FAIL_STATES = ['fail', 'abort']

/**
 * HMR Update processor
 *
 * @public
 */
export class Controller {
  /**
   * Hash
   *
   * @public
   */
  public hash: string

  /**
   * Array of renewed modules
   *
   * @public
   */
  public accepted: Array<ModuleId>

  /**
   * Is idle
   *
   * @public
   */
  public get idle(): boolean {
    return module.hot.status() === 'idle'
  }

  /**
   * Is synced
   *
   * @public
   */
  public get synced(): boolean {
    return this.hash == __webpack_hash__
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public options: Options) {}

  /**
   * Update modules
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public update(payload: Payload): void {
    if (payload.hash) this.hash = payload.hash
    !this.synced && this.idle && this.check()
  }

  /**
   * Check for updates
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public check() {
    module.hot.check(false, this.onCheck)
  }

  /**
   * hot.check callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onCheck(error: Error, updated: Array<ModuleId>): void {
    if (error) return this.onError(error)
    if (!updated) return this.reload()

    module.hot.apply(accept, this.onApply)

    updated.filter(this.filterAccepted) && this.reload()
  }

  /**
   * Filter accepted modules
   *
   * @param index - moduleMap index
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public filterAccepted(index: number): boolean {
    return this.accepted && this.accepted.indexOf(index) < 0
  }

  /**
   * hot.apply callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onApply(error: Error, accepted: Array<ModuleId>): void {
    if (error) return this.onError(error)
    if (!this.synced) this.check()

    this.accepted = accepted
  }

  /**
   * Handle error
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onError(error: Error) {
    console.error(error)

    FAIL_STATES.includes(module.hot.status()) && this.reload()
  }

  /**
   * Reload window
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public reload() {
    this.options.reload && window.location.reload()
  }
}
