import * as oclif from '@oclif/core'

import {Command} from '../Command'
import * as flags from '../flags'

/**
 * @internal
 */
export default class Build extends Command {
  /**
   * @internal
   */
  public static description = 'compile source assets'

  /**
   * @internal
   */
  public static examples = [`$ bud build`, `$ bud build --cache`]

  /**
   * @internal
   */
  public static flags = {
    ...Command.flags,
    ...flags.target,
    ...flags.location,

    mode: oclif.Flags.string({
      description: 'compiler mode',
      default: 'production',
      options: ['development', 'production'],
      hidden: true,
    }),

    cache: oclif.Flags.boolean({
      allowNo: true,
      default: true,
      description: 'cache built modules to the filesystem',
    }),
    ['cache.type']: oclif.Flags.string({
      default: 'filesystem',
      options: ['filesystem', 'memory', 'false'],
    }),

    clean: oclif.Flags.boolean({
      allowNo: true,
      default: true,
      description: 'clean dist directory before compiling',
    }),

    config: oclif.Flags.string({
      description: 'path to config file',
    }),

    dashboard: oclif.Flags.boolean({
      allowNo: true,
      default: true,
      description: 'enable bud dashboard',
    }),

    devtool: oclif.Flags.string({
      description: 'specify source-map type',
    }),

    html: oclif.Flags.boolean({
      allowNo: true,
      description: 'generate an html template',
    }),

    hash: oclif.Flags.boolean({
      allowNo: true,
      description: 'hash compiled filenames',
    }),

    inject: oclif.Flags.boolean({
      allowNo: true,
      default: true,
      description: 'automatically register & boot extensions',
    }),

    manifest: oclif.Flags.boolean({
      allowNo: true,
      default: true,
      description: 'emit manifest.json',
    }),

    minimize: oclif.Flags.boolean({
      allowNo: true,
      description: 'minimize file size of compiled assets',
    }),

    ['splitChunks']: oclif.Flags.boolean({
      allowNo: true,
      description: 'create separate chunks for vendor and app code',
    }),

    vendor: oclif.Flags.boolean({
      allowNo: true,
      description:
        'create separate chunks for vendor and app code; alias for splitChunks',
    }),

    runtime: oclif.Flags.boolean({
      allowNo: true,
      description: 'Create a runtime chunk',
    }),

    target: oclif.Flags.string({
      description: 'limit compilation to this compiler',
      multiple: true,
      default: [],
    }),
  }

  public async run() {
    await this.prime(Build)
    await this.build()

    this.app.hooks.on('event.compiler.done', stats => {
      this.notifier.notify(this.app, stats)
      return stats
    })

    await this.app.api.call('run', [])
  }
}
