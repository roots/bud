/* eslint-disable no-console */

import {bind} from 'helpful-decorators'

import {Options} from '../../options'
import {Payload} from '../interface'

/**
 * EventSource wrapper
 *
 * @public
 * @decorator `@bind`
 */
export class Events {
  /**
   * @public
   */
  public source: EventSource

  /**
   * @public
   */
  public timer: NodeJS.Timer

  /**
   * @public
   */
  public lastActive: number

  /**
   * @public
   */
  public listeners: Array<(payload: Payload) => void> = []

  /**
   * @public
   */
  public get time() {
    return Number(new Date())
  }

  /**
   * @public
   */
  public get msSinceLastActive() {
    return this.time - this.lastActive
  }

  /**
   * @public
   */
  public get timedOut() {
    return this.msSinceLastActive > this.options.timeout
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public options: Options) {
    this.timer = setInterval(this.handleTimeout, this.options.timeout / 2)
    this.source = new EventSource(this.options.path)

    this.init()
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public init() {
    this.source.onopen = this.handleOnline
    this.source.onerror = this.handleDisconnect
    this.source.onmessage = this.handleMessage
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public addListener(listener: (event: Payload) => any): void {
    this.listeners.push(listener)
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public handleOnline(): void {
    this.lastActive = this.time
    if (this.options.log) {
      console.log(`online`, this.lastActive)
      console.dir(this.options)
    }
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public handleMessage(payload: Payload): void {
    this.lastActive = this.time
    this.listeners.map(listener => listener(payload))
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public handleTimeout() {
    this.timedOut && this.handleDisconnect()
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public handleDisconnect() {
    clearInterval(this.timer)
    this.source.close()
    setTimeout(this.init, this.options.timeout)
  }
}
