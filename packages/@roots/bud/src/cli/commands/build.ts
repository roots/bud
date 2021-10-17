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
      allowNo: true,
      default: true,
      description: 'cache built modules to the filesystem.',
    }),

    ci: flags.boolean({
      description: 'non raw mode tty interoperable output',
    }),

    devtool: flags.string({
      description: 'specify source-map type',
    }),

    discover: flags.boolean({
      description: 'automatically utilize installed extensions',
    }),

    html: flags.boolean({
      allowNo: true,
      description: 'generate an html template',
    }),

    log: flags.boolean({
      description: 'log to console',
    }),

    hash: flags.boolean({
      allowNo: true,
      description: 'hash compiled filenames',
    }),

    install: flags.boolean({
      char: 'i',
      description: 'ensure peer dependencies are installed',
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

    runtime: flags.boolean({
      allowNo: true,
      description: 'Create a runtime chunk',
    }),

    src: flags.string({
      description: 'specify directory containing source assets',
      default: 'src',
    }),

    dist: flags.string({
      description: 'specify directory to emit assets to',
      default: 'dist',
    }),

    publicPath: flags.string({
      description: 'specify public path',
      default: '',
    }),

    vendor: flags.boolean({
      allowNo: true,
      description:
        'create separate chunks for vendor and app code',
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
