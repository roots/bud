import {flags} from '@oclif/command'
import execa from 'execa'

import type {Bud} from '../../Bud'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Init extends Command {
  public static id = 'init'
  public static title = 'init'
  public static description = 'install peer dependencies'
  public static examples = [`$ bud init`]

  public static flags = {
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

  public app: Bud

  public hasMissingPeers(): boolean {
    return this.getMissingPeers()?.length > 0
  }

  public getMissingPeers(): any[] {
    return this.app.project.has('peers')
      ? this.app.project.getValues('peers')
      : []
  }

  public async run() {
    const options = this.parse(Init)
    const runner = new Runner(options)
    await runner.initialize()

    this.app = runner.app

    const pkgs = this.getMissingPeers().reduce(
      (acc, dependency) =>
        `${acc} ${dependency.name}@${dependency.version}`,
      ``,
    )

    if (!pkgs.length) {
      this.app.success(
        'All peer dependencies met. Nothing to install',
      )
      process.exit()
    }

    const cmd = this.app.dependencies.manager.isYarn()
      ? `yarn add${pkgs} --dev`
      : `npm install${pkgs} --save-dev`

    this.app.info(cmd)

    const task = execa.command(cmd)
    task.stdout.pipe(process.stdout)
    task.stderr.pipe(process.stderr)
    await task.finally()

    this.app.success(`✨ All peer packages installed`)
    process.exit()
  }
}
