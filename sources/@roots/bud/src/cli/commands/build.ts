import {bind} from '@roots/bud-support'
import {Command, Option} from 'clipanion'
import * as t from 'typanion'

import {Bud} from '../../Bud/index.js'
import {factory} from '../../factory/index.js'
import {seed} from '../../seed.js'
import * as dynamic from '../config/dynamic.config.js'
import * as manifest from '../config/manifest.config.js'
import * as overrides from '../config/override.config.js'
import {Notifier} from '../Notifier/index.js'

/**
 * Accepted options
 *
 * @public
 */
export interface BuildOptions {
  cache: Bud.Options['config']['cache']
  features: Bud.Options['config']['features']
  location: Bud.Options['config']['location']
  mode: Bud.Options['config']['mode']
  publicPath: Bud.Options['config']['output']['publicPath']
  target: Array<string>
}

/**
 * Build command
 *
 * @public
 */
export class BuildCommand extends Command {
  /**
   * Application
   *
   * @public
   */
  public app: Bud

  /**
   * Application logger
   *
   * @public
   */
  public get logger() {
    return this.app.logger.scoped('cli')
  }

  /**
   * Node notifier
   *
   * @public
   */
  public notifier: Notifier

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
    examples: [
      [`Compile source`, `$0 build`],
      [
        `Compile from a single compiler`,
        `$0 build --target [compiler-name]`,
      ],
    ],
  })

  /**
   * --mode
   */
  public mode = Option.String(seed.mode, 'production', {
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
   * --cacheType
   */
  public cacheType = Option.String(`--cacheType`, seed.cache.type, {
    description: `Type of cache`,
    tolerateBoolean: true,
    validator: t.isOneOf([
      t.isLiteral('filesystem'),
      t.isLiteral('memory'),
    ]),
  })

  /**
   * --clean
   */
  public clean = Option.Boolean(`--clean`, seed.features.clean, {
    description: `Clean artifacts and distributables prior to compilation`,
  })

  /**
   * --hash
   */
  public hash = Option.Boolean(`--clean`, seed.features.hash, {
    description: 'Hash compiled files',
  })

  /**
   * --html
   */
  public html = Option.Boolean(`--html`, seed.features.hash, {
    description: 'Generate an html template',
  })

  /**
   * --inject
   */
  public inject = Option.Boolean(`--inject`, seed.features.inject, {
    description: 'Automatically inject extensions',
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
  public src = Option.String(`--source`, seed.location.src, {
    description: 'Source directory (relative to project)',
  })

  /**
   * --dist
   */
  public dist = Option.String(`--dist`, seed.location.dist, {
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
    `--publicPath --public`,
    // this value may be a function, but not over cli
    seed.build.output.publicPath as string,
  )

  /**
   * --splitChunks
   */
  public splitChunks = Option.Boolean(
    `--splitChunks`,
    seed.features.splitChunks,
    {
      description: 'Separate vendor bundle',
    },
  )

  /**
   * --target
   */
  public target = Option.Array(`--target -t`, [], {
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
    this.app = await factory({config: this.config()})

    await this.make()
    await this.run()
  }

  /**
   * Bootstrap Application
   *
   * @returns Bud
   */
  @bind
  public async make() {
    this.notifier = new Notifier(this.app)

    try {
      this.logger.time('process user configs')
      await dynamic.configs(this.app, this.logger)
      await manifest.configs(this.app, this.logger)
      this.logger.timeEnd('process user configs')
    } catch (error) {
      throw new Error(error)
    }

    await overrides.config(this.app, this.config())
    this.app.api.processQueue()
    this.app.extensions.processQueue()

    return this.app
  }

  /**
   * Run the build
   *
   * @public
   */
  @bind
  public async run() {
    await this.app.api.call('run')
  }
}
