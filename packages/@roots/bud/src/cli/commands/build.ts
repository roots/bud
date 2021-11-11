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
    version: flags.version(),

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
      default: true,
      description: 'preserve logger output',
    }),
    ['log.secret']: flags.string({
      default: [process.cwd()],
      multiple: true,
      description: 'hide matching strings from logging output',
    }),

    mode: flags.string({
      description: 'compiler mode',
      default: 'production',
      options: ['development', 'production'],
    }),

    cache: flags.boolean({
      allowNo: true,
      default: true,
      description: 'cache built modules to the filesystem',
    }),
    ['cache.type']: flags.string({
      default: 'filesystem',
      options: ['filesystem', 'memory', 'false'],
    }),

    clean: flags.boolean({
      allowNo: true,
      default: true,
      description: 'clean dist directory before compiling',
    }),

    config: flags.string({
      description: 'path to config file',
    }),

    dashboard: flags.boolean({
      allowNo: true,
      default: true,
      description: 'enable bud dashboard',
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
      default: false,
    }),

    manifest: flags.boolean({
      allowNo: true,
      default: true,
      description: 'emit manifest.json',
    }),

    minimize: flags.boolean({
      allowNo: true,
      description: 'minimize file size of compiled assets',
    }),

    ['location.src']: flags.string({
      description: 'directory containing source assets',
    }),

    ['location.dist']: flags.string({
      description: 'directory to emit assets to',
    }),

    ['location.project']: flags.string({
      description: 'project directory',
    }),

    ['location.publicPath']: flags.string({
      description: 'public path',
    }),

    ['splitChunks']: flags.boolean({
      allowNo: true,
      description:
        'create separate chunks for vendor and app code',
    }),
    vendor: flags.boolean({
      allowNo: true,
      description:
        'create separate chunks for vendor and app code; alias for splitChunks',
    }),
    runtime: flags.boolean({
      allowNo: true,
      description: 'Create a runtime chunk',
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
