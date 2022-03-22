import {lodash} from '@roots/bud-support'
import {Command, Option} from 'clipanion'
import * as t from 'typanion'

import {factory} from '../../factory/index.js'
import {seed} from '../../seed.js'
import * as overrides from '../config/override.config.js'
import {BaseCommand} from './base.js'

const {isUndefined} = lodash

/**
 * Build command
 *
 * @public
 */
export class BuildCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`build`]]

  /**
   * Command usage
   *
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
  })

  /**
   * --ci
   */
  public ci = Option.Boolean(`--ci`, undefined, {
    description: `Run in CI mode (disables keyboard input handlers).`,
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

  /**
   * --devtool
   */
  public devtool = Option.Boolean(`--devtool`, undefined, {
    description: `Set devtool option`,
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

    this.context.args = {
      cache: this.cache ?? null,
      clean: this.clean ?? null,
      devtool: this.devtool ?? null,
      dist: this.dist ?? null,
      flush: this.flush ?? null,
      hash: this.hash ?? null,
      html: this.html ?? null,
      indicator: this.indicator ?? null,
      inject: this.inject ?? null,
      log: this.log ?? null,
      verbose: this.verbose ?? null,
      manifest: this.manifest ?? null,
      minimize: this.minimize ?? null,
      mode: this.mode ?? null,
      modules: this.modules ?? null,
      notify: this.notify ?? null,
      overlay: this.overlay ?? null,
      publicPath: this.publicPath ?? null,
      src: this.src ?? null,
      splitChunks: this.splitChunks ?? null,
      target: this.target ?? null,
    }

    this.app = await factory({
      name: 'bud',
      mode: this.mode,
      context: this.context,
      config: {
        'build.output.publicPath': isUndefined(this.publicPath)
          ? seed['build.output.publicPath']
          : () => this.publicPath,
        'features.inject': isUndefined(this.inject)
          ? seed['features.inject']
          : this.inject,
        'features.log': isUndefined(this.log)
          ? seed['features.log']
          : this.log,
        'features.manifest': isUndefined(this.manifest)
          ? seed['features.manifest']
          : this.manifest,
        location: {
          '@src': isUndefined(this.src) ? seed.location['@src'] : this.src,
          '@dist': isUndefined(this.dist)
            ? seed.location['@dist']
            : this.dist,
          '@storage': isUndefined(this.storage)
            ? seed.location['@storage']
            : this.storage,
          '@modules': isUndefined(this.modules)
            ? seed.location['@modules']
            : this.modules,
        },
      },
    })

    await this.make()
    await overrides.config(this)
    await this.run()
  }
}
