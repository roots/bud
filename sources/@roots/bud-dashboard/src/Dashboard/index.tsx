import {Dashboard as Contract} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, once} from '@roots/bud-support'
import readline from 'node:readline'

import {stats} from './stats'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Contract {
  /**
   * Is raw mode compatible
   *
   * @public
   */
  public tty: boolean = process.stdin.isTTY

  /**
   * Register service
   *
   * @public
   * @decorator `@bind`
   * @decorator `@bind`
   */
  @bind
  @once
  public async register() {
    readline.emitKeypressEvents(process.stdin)
    this.tty && process.stdin.setRawMode(true)

    process.stdin.on(
      'keypress',
      (chunk, key) => key && key.name == 'q' && this.app.close(),
    )
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async stats(compilerStats): Promise<void> {
    stats.write(compilerStats, this.app)
  }
}
