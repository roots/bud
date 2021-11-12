import {flags} from '@oclif/command'
import {ensureDir} from 'fs-extra'

import {Bud} from '../../Bud'
import {remove} from '../cli.dependencies'
import {Command} from '../Command'
import {Runner} from '../Runner'

/**
 * @public
 */
export default class Clean extends Command {
  /**
   * @public
   */
  public static id: string = 'clean'

  /**
   * @public
   */
  public static title: string | undefined = 'clean'

  /**
   * @public
   */
  public static description =
    'clean project distributables and caches'

  /**
   * @public
   */
  public static examples = [`$ bud clean`]

  /**
   * @public
   */
  public app: Bud

  /**
   * @public
   */
  public static flags = {
    help: flags.help({char: 'h'}),
    target: flags.string({
      char: 't',
      description: 'limit compilation to this compiler',
      multiple: true,
      default: [],
    }),
    log: flags.boolean({
      description: 'log to console',
      default: true,
      allowNo: true,
    }),
    ['log.level']: flags.string({
      description:
        'set log verbosity. `v` is error level. `vv` is warning level. `vvv` is log level. `vvvv` is debug level.',
      default: 'vvv',
      options: ['v', 'vv', 'vvv', 'vvvv'],
    }),
    ['log.papertrail']: flags.boolean({
      allowNo: true,
      default: false,
      description: 'preserve logger output',
    }),
    ['log.secret']: flags.string({
      default: [process.cwd()],
      multiple: true,
      description: 'hide matching strings from logging output',
    }),
  }

  /**
   * @public
   */
  public async run() {
    const options = this.parse(Clean)
    const runner = new Runner({
      ...options,
      flags: {...options.flags, log: false},
    })
    await runner.initialize()

    this.app = runner.app

    const logger = this.app.logger.makeInstance({
      interactive: false,
    })
    logger.enable()
    logger.info(`clearing artifacts`)

    try {
      logger.pending(`emptying ${this.app.path('storage')}`)

      await ensureDir(this.app.path('storage'))
      await remove(this.app.path('storage'))

      logger.success(`emptying ${this.app.path('storage')}`)
    } catch (err) {
      logger.error(err)
    }

    try {
      logger.pending(`emptying ${this.app.path('dist')}`)

      await remove(this.app.path('dist'))

      logger.success(`emptying ${this.app.path('dist')}`)
    } catch (err) {
      logger.error(err)
    }

    process.exit()
  }
}
