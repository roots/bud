import {lodash as _} from '@roots/bud-support'
import {Command, Option} from 'clipanion'
import * as t from 'typanion'

import {Bud} from '../../Bud/index.js'
import {factory} from '../../factory/index.js'
import {seed} from '../../seed.js'
import {BaseCommand} from './base.js'

/**
 * Accepted options
 *
 * @public
 */
export interface BuildOptions {
  cache?: Bud.Options['config']['cache']
  features?: Bud.Options['config']['features']
  location?: Bud.Options['config']['location']
  mode?: Bud.Options['config']['mode']
  publicPath?: Bud.Options['config']['output']['publicPath']
  target?: Array<string>
}

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
  public mode = Option.String(`--mode`, seed.mode, {
    description: `Compilation mode`,
    validator: t.isOneOf([
      t.isLiteral('production'),
      t.isLiteral('development'),
    ]),
  })

  /**
   * --cache
   */
  public cache = Option.Boolean(`--cache`, seed.features.cache, {
    description: `Utilize filesystem cache`,
  })

  /**
   * --cache.type
   */
  public cacheType = Option.String(
    `--cacheType,--cache.type`,
    seed.cache.type,
    {
      description: `Type of cache`,
      validator: t.isOneOf([
        t.isLiteral('filesystem'),
        t.isLiteral('memory'),
      ]),
    },
  )

  /**
   * --clean
   */
  public clean = Option.Boolean(`--clean`, seed.features.clean, {
    description: `Clean artifacts and distributables prior to compilation`,
  })

  /**
   * --dashboard
   */
  public dashboard = Option.Boolean(`--dashboard`, undefined, {
    hidden: true,
  })

  /**
   * --hash
   */
  public hash = Option.Boolean(`--hash`, seed.features.hash, {
    description: 'Hash compiled files',
  })

  /**
   * --html
   */
  public html = Option.Boolean(`--html`, seed.features.html, {
    description: 'Generate an html template',
  })

  /**
   * --inject
   */
  public inject = Option.Boolean(`--inject`, seed.features.inject, {
    description: 'Automatically inject extensions',
    hidden: true,
  })

  /**
   * --project
   */
  public project = Option.String(`--project`, seed.location.project, {
    description: 'Project directory',
  })

  /**
   * --src
   */
  public src = Option.String(`--input,-i`, seed.location.src, {
    description: 'Source directory (relative to project)',
  })

  /*
   * --dist
   */
  public dist = Option.String(`--output,-o`, seed.location.dist, {
    description: 'Distribution directory (relative to project)',
  })

  /**
   * --storage
   */
  public storage = Option.String(`--storage`, seed.location.storage, {
    description: 'Storage/cache directory (relative to project)',
  })

  /**
   * --log
   */
  public log = Option.Boolean(`--log`, seed.features.log, {
    description: 'Enable logging',
  })

  /**
   * --log.level
   */
  public logLevel = Option.String(
    `--logLevel,--log.level`,
    seed.log.level,
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
  public manifest = Option.Boolean(`--manifest`, seed.features.manifest, {
    description: 'Generate a manifest of compiled assets',
  })

  /**
   * --minimize
   */
  public minimize = Option.Boolean(
    `--minimize`,
    seed.build.optimization.enable,
    {
      description: 'Minimize compiled assets',
    },
  )

  /**
   * --publicPath
   */
  public publicPath = Option.String(
    `--publicPath`,
    // this value may be a function, but not over cli
    seed.build.output.publicPath as string,
    {description: 'public path of emitted assets'},
  )

  /**
   * --splitChunks
   */
  public splitChunks = Option.Boolean(
    `--splitChunks,--vendor`,
    seed.features.splitChunks,
    {
      description: 'Separate vendor bundle',
    },
  )

  /**
   * --target
   */
  public target = Option.Array(`--target,-t`, [], {
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
  public config(): BuildOptions {
    return {
      ...seed,
      mode: this.mode,
      target: this.target,
      location: {
        ...seed.location,
        project: this.project,
        src: this.src,
        dist: this.dist,
        storage: this.storage,
      },
      publicPath: this.publicPath,
      cache: {
        ...seed.cache,
        type: this.cacheType,
      },
      features: {
        ...seed.features,
        cache: this.cache,
        clean: this.clean,
        hash: this.hash,
        html: this.html,
        inject: this.inject,
        log: this.log,
        manifest: this.manifest,
        splitChunks: this.splitChunks,
      },
    }
  }

  /**
   * Execute command
   */
  public async execute() {
    if (!_.isUndefined(this.dashboard))
      this.context.stdout.write(
        `the --dashboard and --no-dashboard flags are deprecated and will be removed in a future release.\n`,
      )

    this.app = await factory({config: this.config()})

    await this.make()
    await this.run()
  }
}
