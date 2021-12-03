import * as oclif from '@oclif/core'

import Build from './build.js'

/**
 * @public
 */
export default class Serve extends Build {
  /**
   * @public
   */
  public static title = 'serve'

  /**
   * @public
   */
  public static description = 'compile assets'

  /**
   * @public
   */
  public static examples = [`$ bud serve --cache`]

  /**
   * @public
   */
  public static aliases = ['dev', 'start']

  /**
   * @public
   */
  public static flags = {
    ...Build.flags,
    mode: oclif.Flags.string({
      default: 'development',
      options: ['development', 'production'],
      hidden: true,
    }),
  }

  /**
   * @public
   */
  public async run() {
    await this.prime(Serve)
    await this.build()

    this.app.hooks.on('event.compiler.done', stats => {
      this.notifier.notify(this.app, stats)
      return stats
    })

    await this.app.api.call('run', [])
  }
}
