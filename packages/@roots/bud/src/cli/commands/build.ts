import * as Oclif from '@oclif/command'

import {Command} from '../Command'
import * as flags from '../flags'

/**
 * @public
 */
export default class Build extends Command {
  /**
   * @public
   */
  public static id = 'build'

  /**
   * @public
   */
  public static title = 'build'

  /**
   * @public
   */
  public static description = 'compile source assets'

  /**
   * @public
   */
  public static examples = [`$ bud build`, `$ bud build --cache`]

  /**
   * @public
   */
  public static flags = {
    ...Command.flags,
    ...flags.target,
    ...flags.location,

    mode: Oclif.flags.string({
      description: 'compiler mode',
      default: 'production',
      options: ['development', 'production'],
      hidden: true,
    }),

    cache: Oclif.flags.boolean({
      allowNo: true,
      default: true,
      description: 'cache built modules to the filesystem',
    }),
    ['cache.type']: Oclif.flags.string({
      default: 'filesystem',
      options: ['filesystem', 'memory', 'false'],
    }),

    clean: Oclif.flags.boolean({
      allowNo: true,
      default: true,
      description: 'clean dist directory before compiling',
    }),

    config: Oclif.flags.string({
      description: 'path to config file',
    }),

    dashboard: Oclif.flags.boolean({
      allowNo: true,
      default: true,
      description: 'enable bud dashboard',
    }),

    devtool: Oclif.flags.string({
      description: 'specify source-map type',
    }),

    flush: Oclif.flags.boolean({
      description: 'flush internal bud cache',
      default: false,
    }),

    html: Oclif.flags.boolean({
      allowNo: true,
      description: 'generate an html template',
    }),

    hash: Oclif.flags.boolean({
      allowNo: true,
      description: 'hash compiled filenames',
    }),

    inject: Oclif.flags.boolean({
      allowNo: true,
      default: true,
      description: 'automatically register & boot extensions',
    }),

    install: Oclif.flags.boolean({
      description: 'ensure peer dependencies are installed',
      default: false,
    }),

    manifest: Oclif.flags.boolean({
      allowNo: true,
      default: true,
      description: 'emit manifest.json',
    }),

    minimize: Oclif.flags.boolean({
      allowNo: true,
      description: 'minimize file size of compiled assets',
    }),

    ['splitChunks']: Oclif.flags.boolean({
      allowNo: true,
      description:
        'create separate chunks for vendor and app code',
    }),

    vendor: Oclif.flags.boolean({
      allowNo: true,
      description:
        'create separate chunks for vendor and app code; alias for splitChunks',
    }),

    runtime: Oclif.flags.boolean({
      allowNo: true,
      description: 'Create a runtime chunk',
    }),

    target: Oclif.flags.string({
      description: 'limit compilation to this compiler',
      multiple: true,
      default: [],
    }),
  }

  public async run() {
    await this.prime(Build)
    await this.build()

    this.app.hooks.on('done', [this.notifier.notify])
    await this.app.run()
  }
}
