import {flags} from '@oclif/command'

import {Bud} from '../../Bud'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Build extends Command {
  public static description = 'compile assets'

  public static examples = [
    `$ bud build production`,
    `$ bud build development`,
    `$ bud build --cache`,
  ]

  public static args = [{name: 'mode'}]

  public static flags = {
    help: flags.help({char: 'h'}),

    cache: flags.boolean({
      char: 'c',
      allowNo: true,
      default: true,
      description: 'cache compiler references to disk',
    }),

    ci: flags.boolean({
      description: 'non raw mode tty interoperable output',
    }),

    discover: flags.boolean({
      char: 'd',
      description: 'automatically utilize installed extensions',
    }),

    html: flags.boolean({
      char: 'd',
      description: 'generate an html template',
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
      char: 'h',
      allowNo: true,
      description: 'hash compiled filenames',
    }),

    manifest: flags.boolean({
      allowNo: true,
      default: true,
      description: 'produce a manifest',
    }),

    minimize: flags.boolean({
      char: 'm',
      allowNo: true,
      description: 'minimize file size of compiled assets',
    }),

    target: flags.string({
      char: 't',
      description: 'limit compilation to this compiler',
      multiple: true,
      default: [],
    }),
  }

  public app: Bud

  public async run() {
    const runner = new Runner(this.parse(Build))

    this.app = await runner.make()

    this.app.hooks.on('done', [this.notifier.notify])

    this.app.run()
  }
}
