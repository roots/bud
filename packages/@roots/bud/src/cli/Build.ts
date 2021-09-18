import {flags} from '@oclif/command'

import Bud from '../Bud'
import {Command} from './Command'
import {Runner} from './Runner'

export default class Build extends Command {
  public static description = 'Build application'

  public mode: 'development' | 'production'

  public cli: {flags: any; args: any}

  public app: Bud

  public static flags = {
    help: flags.help({char: 'h'}),

    cache: flags.boolean({
      char: 'c',
      description: 'cache compiler references to disk',
    }),

    cli: flags.boolean({
      description: 'non raw mode tty interoperable output',
    }),

    discover: flags.boolean({
      char: 'd',
      description: 'automatically utilize installed extensions',
    }),

    install: flags.boolean({
      char: 'i',
      description: 'ensure peer dependencies are installed',
    }),

    log: flags.boolean({
      char: 'l',
      description: 'log to console',
    }),

    hash: flags.boolean({
      description: 'hash compiled filenames',
    }),

    manifest: flags.boolean({
      description: 'produce a manifest',
    }),

    minimize: flags.boolean({
      char: 'm',
      description: 'minimize file size of compiled assets',
    }),

    target: flags.string({
      char: 't',
      description: 'limit compilation to this compiler',
      multiple: true,
      default: [],
    }),
  }

  public async run() {
    this.cli = this.parse(Build)

    const runner = new Runner(this.cli, {mode: this.mode})

    this.app = await runner.make()

    this.app.hooks.on('done', [this.notifier.notify])
    this.app.run()
  }
}
