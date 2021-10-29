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

    clearCache: flags.boolean({
      description: 'Clear the cache before compilation',
    }),

    ci: flags.boolean({
      description: 'non raw mode tty interoperable output',
    }),

    clean: flags.boolean({
      allowNo: true,
      description: 'clean distributables on compilation',
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
    }),

    dist: flags.string({
      description: 'specify directory to emit assets to',
    }),

    publicPath: flags.string({
      description: 'specify public path',
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
    const options = this.parse(Build)
    const runner = new Runner(options, {mode: 'production'})

    await runner.initialize()
    this.app = await runner.make()

    this.app.hooks.on('done', [this.notifier.notify])
    await this.app.run()
  }
}
