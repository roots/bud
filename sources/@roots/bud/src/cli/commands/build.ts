import {lodash as _} from '@roots/bud-support'
import {Command, Option} from 'clipanion'
import {isUndefined} from 'lodash'
import * as t from 'typanion'

import {factory} from '../../factory/index.js'
import {Bud} from '../../index.js'
import {seed} from '../../seed.js'
import * as overrides from '../config/override.config.js'
import {BaseCommand} from './base.js'

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
      \`bud build\` compiles source assets from the \`src\` directory to the \`dist\` directory.

      Any boolean options can be negated by prefixing the flag with \`--no-\`. You can also pass a boolean
      value. Example: \`--no-cache\` and \`--cache false\` are equivalent.

      By default, the \`src\` directory is \`[cwd]/src\`. You can override this with the \`-i\` flag.

      If you run this command without a bud configuration file \`bud\` will
      look for an entrypoint at \`src/index.js\`.
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
    description: `Utilize filesystem cache`,
    tolerateBoolean: true,
    validator: t.isOneOf([
      t.isLiteral('filesystem'),
      t.isLiteral('memory'),
      t.isLiteral(true),
      t.isLiteral(false),
    ]),
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
    description: `Set devtool`,
  })

  /**
   * --hash
   */
  public hash = Option.Boolean(`--hash`, undefined, {
    description: 'Hash compiled files',
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
   * --project
   */
  public project = Option.String(`--project`, undefined, {
    description: 'Project directory',
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
    description: 'Storage/cache directory (relative to project)',
  })

  /**
   * --log
   */
  public log = Option.Boolean(`--log`, undefined, {
    description: 'Enable logging',
  })

  /**
   * --log.level
   */
  public logLevel = Option.String(
    `--logLevel,--log.level`,
    seed['log.level'],
    {
      description: 'Set logging level',
      validator: t.isOneOf([
        t.isLiteral('v'),
        t.isLiteral('vv'),
        t.isLiteral('vvv'),
        t.isLiteral('vvvv'),
      ]),
    },
  )

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
   * Bud configuration
   *
   * @remarks
   * Fills in whatever is missing with values from the seed config.
   *
   * @returns Bud configuration
   */
  public config(): Bud.Options['config'] {
    const config: Bud.Options['config'] = seed

    if (!isUndefined(this.project)) config.location.project = this.project
    if (!isUndefined(this.src)) config.location.src = this.src
    if (!isUndefined(this.dist)) config.location.dist = this.dist
    if (!isUndefined(this.storage)) config.location.storage = this.storage

    if (!isUndefined(this.publicPath))
      config['build.output.publicPath'] = () => this.publicPath
    if (!isUndefined(this.log)) config['features.log'] = this.log
    if (!isUndefined(this.manifest))
      config['features.manifest'] = this.manifest

    return config
  }

  /**
   * Execute command
   */
  public async execute() {
    if (!_.isUndefined(this.dashboard))
      this.context.stdout.write(
        `the --dashboard and --no-dashboard flags are deprecated and will be removed in a future release.\n`,
      )

    this.app = await factory({
      name: 'bud',
      mode: this.mode,
      config: this.config(),
    })

    await this.make()

    await overrides.config(this)

    await this.run()
  }
}
