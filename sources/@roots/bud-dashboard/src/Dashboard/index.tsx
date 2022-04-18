import {Dashboard as Base} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {StatsCompilation} from 'webpack'

import {stats} from './stats'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Base.Service {
  protected hash: string

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public stats(compilerStats: StatsCompilation): void {
    const jsonStats = compilerStats.toJson(),
      stringStats = compilerStats.toString()

    if (jsonStats.hash === this.hash) return

    this.hash = jsonStats.hash
    this.app.context.args.ci
      ? // eslint-disable-next-line no-console
        this.app.context.stdout.write(`\n${stringStats}\n`)
      : stats.write(jsonStats, this.app)
  }
}
