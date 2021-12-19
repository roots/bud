import * as oclif from '@oclif/core'

import {Command} from '../Command'
import * as flags from '../flags'
import Build from './build.js'

/**
 * @internal
 */
export default class Serve extends Build {
  /** @internal */
  public static title = 'serve'

  /** @internal */
  public static description =
    'build project assets and initialize development server'

  /** @internal */
  public static examples = [`$ bud serve`]

  /** @internal */
  public static aliases = ['dev', 'start']

  /** @internal */
  public static flags = {
    ...Command.flags,
    ...flags.target,
    ...flags.location,

    mode: oclif.Flags.string({
      description: 'compiler mode',
      default: 'development',
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

    install: oclif.Flags.boolean({
      description: 'ensure peer dependencies are installed',
      default: false,
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
      description:
        'create separate chunks for vendor and app code',
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

  /** @internal */
  public async run() {
    await this.prime(Serve)
    await this.build()

    this.app.hooks.on('event.compiler.done', stats => {
      this.notifier.notify(this.app, stats)
      return stats
    })

    await this.app.api.call('run')
  }
}
