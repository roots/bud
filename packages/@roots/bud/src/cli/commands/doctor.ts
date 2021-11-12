import {flags} from '@oclif/command'
import chalk from 'chalk'

import {Bud} from '../../Bud'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Doctor extends Command {
  public static id = 'doctor'
  public static title = 'doctor'
  public static description = 'diagnose issues'
  public static examples = [`$ bud doctor`]

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

  public static args = []

  public app: Bud

  public hasMissingPeers(): boolean {
    return this.getMissingPeers().length > 0
  }

  public getMissingPeers(): {name: string; version: string}[] {
    return this.app.project.get('unmet')
  }

  public async run(): Promise<void> {
    const options = this.parse(Doctor)
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
    logger.scope('doctor')

    logger.info(`validating project`)

    !this.hasMissingPeers()
      ? logger.success('All checks are O.K.')
      : (() => {
          this.getMissingPeers().map(({name, version}) =>
            logger.error(
              chalk.red`missing `.concat(`${name}@${version}`),
            ),
          )

          logger.warn(
            chalk.yellow`Run \`bud init\` to install missing dependencies`,
          )
        })()

    return process.exit()
  }
}
