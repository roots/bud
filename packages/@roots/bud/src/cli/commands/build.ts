import {flags} from '@oclif/command'

import {Bud} from '../../Bud'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Build extends Command {
  public static description = 'compile assets'
  public static examples = [
    `$ bud build production`,
    `$ bud build development`,
    `$ bud build`,
    `$ bud build dev`,
    `$ bud build --cache`,
  ]
  public static args = [{name: 'mode'}]

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
    const {args} = this.parse(Build)

    if (!args.mode) {
      args.mode = 'production'
    }
    if (args.mode === 'dev') {
      args.mode = 'development'
    }

    const runner = new Runner(this.parse(Build), args)

    this.app = await runner.make()

    this.app.hooks.on('done', [this.notifier.notify])

    this.app.run()
  }
}
