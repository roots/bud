import {lodash} from '@roots/bud-support'
import {Command, Option} from 'clipanion'
import * as t from 'typanion'

import {factory} from '../../factory/index.js'
import {seed} from '../../seed.js'
import * as overrides from '../config/override.config.js'
import {BaseCommand} from './base.js'

const {isUndefined} = lodash

const fallback = (obj: any | undefined, obj2: any) =>
  isUndefined(obj) ? obj2 : obj

/**
 * Build command
 * @public
 */
export class BuildCommand extends BaseCommand {
  /**
   * Command paths
   * @public
   */
  public static paths = [[`build`]]

  /**
   * Command usage
   * @public
   */
  public static usage = Command.Usage({
    category: `Compile`,
    description: `Compile source assets`,
    details: `
      \`bud build\` compiles source assets from the \`@src\` directory to the \`@dist\` directory.

      Any boolean options can be negated by prefixing the flag with \`--no-\`. You can also pass a boolean
      value. Example: \`--no-cache\` and \`--cache false\` are equivalent.

      By default, the \`@src\` directory is \`[project]/src\`. You can override this with the \`-i\` flag.

      If you run this command without a bud configuration file \`bud\` will
      look for an entrypoint at \`@src/index.js\`.
    `,
    examples: [[`Compile source`, `$0 build`]],
  })

  /**
   * --mode
   */
  public mode = Option.String(`--mode`, 'production', {
    description: `Compilation mode`,
    validator: t.isOneOf([
      t.isLiteral('production'),
      t.isLiteral('development'),
    ]),
    env: 'BUILD_MODE',
  })

  /**
   * --cache
   */
  public cache = Option.String(`--cache`, undefined, {
    description: `Utilize compiler's filesystem cache`,
    tolerateBoolean: true,
    validator: t.isOneOf([
      t.isLiteral('filesystem'),
      t.isLiteral('memory'),
      t.isLiteral(true),
      t.isLiteral(false),
    ]),
    env: 'BUILD_CACHE',
  })

  /**
   * --clean
   */
  public clean = Option.Boolean(`--clean`, undefined, {
    description: `Clean artifacts and distributables prior to compilation`,
  })

  /**
   * --dashboard
   */
  public dashboard = Option.Boolean(`--dashboard`, undefined, {
    hidden: true,
  })

  public debug = Option.Boolean(`--debug`, false, {
    description:
      'Enable debugging mode. Very verbose logging. Writes output files to `@storage` directory',
  })

  /**
   * --devtool
   */
  public devtool = Option.String(`--devtool`, undefined, {
    description: `Set devtool option`,
    validator: t.isOneOf([
      t.isLiteral(false),
      t.isLiteral('eval'),
      t.isLiteral('eval-cheap-source-map'),
      t.isLiteral('eval-cheap-module-source-map'),
      t.isLiteral('eval-source-map'),
      t.isLiteral('cheap-source-map'),
      t.isLiteral('cheap-module-source-map'),
      t.isLiteral('source-map'),
      t.isLiteral('inline-cheap-source-map'),
      t.isLiteral('inline-cheap-module-source-map'),
      t.isLiteral('inline-source-map'),
      t.isLiteral('eval-nosources-cheap-source-map'),
      t.isLiteral('eval-nosources-cheap-modules-source-map'),
      t.isLiteral('eval-nosources-source-map'),
      t.isLiteral('inline-nosources-cheap-source-map'),
      t.isLiteral('inline-nosources-cheap-module-source-map'),
      t.isLiteral('inline-nosources-source-map'),
      t.isLiteral('nosources-cheap-source-map'),
      t.isLiteral('nosources-cheap-module-source-map'),
      t.isLiteral('hidden-nosources-cheap-source-map'),
      t.isLiteral('hidden-nosources-cheap-module-source-map'),
      t.isLiteral('hidden-nosources-source-map'),
      t.isLiteral('hidden-cheap-source-map'),
      t.isLiteral('hidden-cheap-module-source-map'),
      t.isLiteral('hidden-source-map'),
    ]),
  })

  /**
   * --flush
   */
  public flush = Option.Boolean(`--flush`, undefined, {
    description: `Force clearing bud internal cache`,
  })

  /**
   * --hash
   */
  public hash = Option.Boolean(`--hash`, undefined, {
    description: 'Hash compiled filenames',
  })

  /**
   * --html
   */
  public html = Option.Boolean(`--html`, undefined, {
    description: 'Generate an html template',
  })

  /**
   * --inject
   */
  public inject = Option.Boolean(`--inject`, undefined, {
    description: 'Automatically inject extensions',
    hidden: true,
  })

  /**
   * --src
   */
  public src = Option.String(`--input,-i`, undefined, {
    description: 'Source directory (relative to project)',
  })

  /*
   * --dist
   */
  public dist = Option.String(`--output,-o`, undefined, {
    description: 'Distribution directory (relative to project)',
  })

  /**
   * --storage
   */
  public storage = Option.String(`--storage`, undefined, {
    description: 'Storage directory (relative to project)',
    env: 'BUILD_PATH_STORAGE',
  })

  /**
   * --indicator
   */
  public indicator = Option.Boolean(`--indicator`, true, {
    description: 'Enable development status indicator',
  })

  /**
   * --log
   */
  public log = Option.Boolean(`--log`, undefined, {
    description: 'Enable logging',
  })

  /**
   * --manifest
   */
  public manifest = Option.Boolean(`--manifest`, undefined, {
    description: 'Generate a manifest of compiled assets',
  })

  /**
   * --minimize
   */
  public minimize = Option.Boolean(`--minimize`, undefined, {
    description: 'Minimize compiled assets',
  })

  /**
   * --modules
   */
  public modules = Option.String(`--modules`, undefined, {
    description: 'Module resolution path',
    env: 'BUILD_PATH_MODULES',
  })

  /**
   * --notify
   */
  public notify = Option.Boolean(`--notify`, true, {
    description: 'Enable notfication center messages',
  })

  /**
   * --overlay
   */
  public overlay = Option.Boolean(`--overlay`, true, {
    description: 'Enable error overlay in development mode',
  })

  /**
   * --publicPath
   */
  public publicPath = Option.String(`--publicPath`, undefined, {
    description: 'public path of emitted assets',
    env: 'APP_PUBLIC_PATH',
  })

  /**
   * --splitChunks
   */
  public splitChunks = Option.Boolean(
    `--splitChunks,--vendor`,
    undefined,
    {
      description: 'Separate vendor bundle',
    },
  )

  /**
   * --target
   */
  public target = Option.Array(`--target,-t`, undefined, {
    description: 'Limit compilation to particular compilers',
  })

  /**
   * --verbose
   */
  public verbose = Option.Boolean(`--verbose`, false, {
    description: 'Set logging level',
  })

  /**
   * Execute command
   */
  public async execute() {
    if (!isUndefined(this.dashboard))
      this.context.stdout.write(
        `the --dashboard and --no-dashboard flags are deprecated and will be removed in a future release.\n`,
      )
    ;[
      'cache',
      'clean',
      'debug',
      'devtool',
      'flush',
      'hash',
      'html',
      'indicator',
      'inject',
      'log',
      'manifest',
      'minimize',
      'mode',
      'modules',
      'notify',
      'overlay',
      'publicPath',
      'src',
      'splitChunks',
      'target',
      'verbose',
    ].map(arg => {
      this.context.args[arg] = fallback(this[arg], null)
    })

    this.app = await factory({
      name: 'bud',
      mode: this.mode,
      context: this.context,
      config: {
        'build.output.publicPath': fallback(
          this.publicPath,
          seed['build.output.publicPath'],
        ),
        'feature.inject': fallback(this.inject, seed['feature.inject']),
        'feature.log': fallback(this.log, seed['feature.log']),
        'feature.manifest': fallback(
          this.manifest,
          seed['feature.manifest'],
        ),
        'location.@src': fallback(this.src, seed['location.@src']),
        'location.@dist': fallback(this.dist, seed['location.@dist']),
        'location.@storage': fallback(
          this.storage,
          seed['location.@storage'],
        ),
        'location.@modules': fallback(
          this.modules,
          seed['location.@modules'],
        ),
      },
    })

    await this.make()
    await overrides.config(this)
    await this.run()
  }
}
