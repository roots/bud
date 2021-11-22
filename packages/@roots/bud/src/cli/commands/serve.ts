import {flags} from '@oclif/command'

import Build from './build'

/**
 * @public
 */
export default class Serve extends Build {
  /**
   * @public
   */
  public static id = 'serve'

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
    mode: flags.string({
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

    this.app.hooks.on('event.compiler.done', stats =>
      this.notifier.notify(this.app, stats),
    )

    await this.app.api.call('run', [])
  }
}
