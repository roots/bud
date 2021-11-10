import {flags} from '@oclif/command'

import {Bud} from '../../Bud'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Build extends Command {
  public static id = 'build'

  public static title = 'build'

  public static description = 'compile source assets'

  public static examples = [`$ bud build`, `$ bud build --cache`]

  public static flags = {
    help: flags.help({char: 'h'}),

    cache: flags.boolean({
      allowNo: true,
      default: true,
      description: 'cache built modules to the filesystem.',
    }),

    ci: flags.boolean({
      default: false,
      description: 'non raw mode tty interoperable output',
    }),

    clean: flags.boolean({
      allowNo: true,
      default: true,
      description: 'clean distributables on compilation',
    }),

    version: flags.version(),

    config: flags.string({
      description: 'path to config file',
    }),

    devtool: flags.string({
      description: 'specify source-map type',
    }),

    flush: flags.boolean({
      description: 'flush internal bud cache',
      default: false,
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

    inject: flags.boolean({
      allowNo: true,
      default: true,
      description: 'automatically register & boot extensions',
    }),

    install: flags.boolean({
      description: 'ensure peer dependencies are installed',
    }),

    manifest: flags.boolean({
      allowNo: true,
      default: true,
      description: 'produce a manifest',
    }),

    minimize: flags.boolean({
      allowNo: true,
      description: 'minimize file size of compiled assets',
    }),

    mode: flags.string({
      description: 'compiler mode',
      default: 'production',
      options: ['development', 'production'],
    }),

    runtime: flags.boolean({
      allowNo: true,
      description: 'Create a runtime chunk',
    }),

    src: flags.string({
      description: 'specify directory containing source assets',
    }),

    dist: flags.string({
      description: 'specify directory to emit assets to',
    }),

    publicPath: flags.string({
      description: 'specify public path',
    }),

    splitChunks: flags.boolean({
      allowNo: true,
      description:
        'create separate chunks for vendor and app code. alias for vendor',
    }),

    vendor: flags.boolean({
      allowNo: true,
      description:
        'create separate chunks for vendor and app code',
    }),

    target: flags.string({
      description: 'limit compilation to this compiler',
      multiple: true,
      default: [],
    }),
  }

  public app: Bud

  public async run() {
    const options = this.parse(Build)
    const runner = new Runner(options)

    await runner.initialize()
    this.app = await runner.make()

    this.app.hooks.on('done', [this.notifier.notify])
    await this.app.run()
  }
}
