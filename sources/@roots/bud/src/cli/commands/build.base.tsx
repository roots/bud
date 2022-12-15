import BaseCommand from '@roots/bud/cli/commands/base'
import type {Context} from '@roots/bud-framework/options/context'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {isString, isUndefined} from '@roots/bud-support/lodash-es'
import * as t from '@roots/bud-support/typanion'

/**
 * Returns true if the given value is neither null nor undefined.
 *
 * @public
 */
const isset = (value: unknown): boolean => !isUndefined(value)

/**
 * Build command
 *
 * @public
 */
export default class BuildCommand extends BaseCommand {
  /**
   * Command paths
   * @public
   */
  public static override paths = [[`build`]]

  /**
   * Command usage
   * @public
   */
  public static override usage = Command.Usage({
    category: `build`,
    description: `Compile source assets`,
    details: `\
      \`bud build production\` compiles source assets in \`production\` mode. Run \`bud build production --help\` for usage.

      \`bud build development\` compiles source assets in \`development\` mode and serves updated modules. Run \`bud build development --help\` for usage.

      If you run this command without a configuration file \`bud\` will look for an entrypoint at \`@src/index.js\`.
    `,
    examples: [[`compile source assets`, `$0 build`]],
  })

  /**
   * (dev only) browser
   * @virtual
   * @public
   */
  public browser?: boolean | string

  /**
   * hot
   * @virtual
   * @public
   */
  public hot?: boolean

  /**
   * reload
   * @virtual
   * @public
   */
  public reload?: boolean

  /**
   * overlay
   * @virtual
   * @public
   */
  public overlay?: boolean

  /**
   * indicator
   * @virtual
   * @public
   */
  public indicator?: boolean

  /**
   * cache
   */
  public cache = Option.String(`--cache`, undefined, {
    description: `Utilize compiler's filesystem cache`,
    tolerateBoolean: true,
    validator: t.isOneOf([
      t.isLiteral(`filesystem`),
      t.isLiteral(`memory`),
      t.isLiteral(true),
      t.isLiteral(false),
    ]),
    env: `APP_CACHE`,
  })

  /**
   * ci
   */
  public ci = Option.Boolean(`--ci`, undefined, {
    description: `Simple build summaries for CI`,
  })

  /**
   * clean
   * @public
   */
  public clean = Option.Boolean(`--clean`, undefined, {
    description: `Clean artifacts and distributables prior to compilation`,
  })

  /**
   * debug
   * @public
   */
  public debug = Option.Boolean(`--debug`, undefined, {
    description: `Write debug files to storage directory`,
  })

  /**
   * devtool
   * @public
   */
  public devtool = Option.String(`--devtool`, undefined, {
    description: `Set devtool option`,
    validator: t.isOneOf([
      t.isLiteral(false),
      t.isLiteral(`eval`),
      t.isLiteral(`eval-cheap-source-map`),
      t.isLiteral(`eval-cheap-module-source-map`),
      t.isLiteral(`eval-source-map`),
      t.isLiteral(`cheap-source-map`),
      t.isLiteral(`cheap-module-source-map`),
      t.isLiteral(`source-map`),
      t.isLiteral(`inline-cheap-source-map`),
      t.isLiteral(`inline-cheap-module-source-map`),
      t.isLiteral(`inline-source-map`),
      t.isLiteral(`eval-nosources-cheap-source-map`),
      t.isLiteral(`eval-nosources-cheap-modules-source-map`),
      t.isLiteral(`eval-nosources-source-map`),
      t.isLiteral(`inline-nosources-cheap-source-map`),
      t.isLiteral(`inline-nosources-cheap-module-source-map`),
      t.isLiteral(`inline-nosources-source-map`),
      t.isLiteral(`nosources-cheap-source-map`),
      t.isLiteral(`nosources-cheap-module-source-map`),
      t.isLiteral(`hidden-nosources-cheap-source-map`),
      t.isLiteral(`hidden-nosources-cheap-module-source-map`),
      t.isLiteral(`hidden-nosources-source-map`),
      t.isLiteral(`hidden-cheap-source-map`),
      t.isLiteral(`hidden-cheap-module-source-map`),
      t.isLiteral(`hidden-source-map`),
    ]),
    env: `APP_DEVTOOL`,
  })

  /**
   * editor
   * @public
   */
  public editor = Option.Boolean(`--editor`, undefined, {
    description: `Open editor to file containing errors on unsuccessful development build`,
  })

  /**
   * esm
   * @public
   */
  public esm = Option.Boolean(`--esm`, undefined, {
    description: `build as es modules`,
  })

  /**
   * flush
   * @public
   */
  public flush = Option.Boolean(`--flush`, undefined, {
    description: `Force clearing bud internal cache`,
  })

  /**
   * hash
   * @public
   */
  public hash = Option.Boolean(`--hash`, undefined, {
    description: `Hash compiled filenames`,
  })

  /**
   * html
   * @public
   */
  public html = Option.String(`--html`, undefined, {
    description: `Generate an html template`,
    tolerateBoolean: true,
  })

  /**
   * immutable
   * @public
   */
  public immutable = Option.Boolean(`--immutable`, undefined, {
    description: `bud.http: immutable module lockfile`,
  })

  /**
   * discovery
   * @public
   */
  public discovery = Option.Boolean(`--discovery`, undefined, {
    description: `Automatically register extensions`,
  })

  /**
   * notify
   * @public
   */
  public override notify = Option.Boolean(`--notify`, true, {
    description: `Enable notfication center messages`,
  })

  /**
   * filter
   * @public
   */
  public override filter = Option.Array(`--filter`, undefined, {
    description: `Limit compilation to particular compilers`,
    hidden: true,
  })

  /**
   * manifest
   * @public
   */
  public manifest = Option.Boolean(`--manifest`, undefined, {
    description: `Generate a manifest of compiled assets`,
  })

  /**
   * minimize
   * @public
   */
  public minimize = Option.Boolean(`--minimize`, undefined, {
    description: `Minimize compiled assets`,
  })

  /**
   * src
   * @public
   */
  public input = Option.String(`--input,-i,--@src,--src`, undefined, {
    description: `Source directory (relative to project)`,
    env: `APP_PATH_INPUT`,
  })

  /**
   * dist
   * @public
   */
  public output = Option.String(`--output,-o,--@dist,--dist`, undefined, {
    description: `Distribution directory (relative to project)`,
    env: `APP_PATH_OUTPUT`,
  })

  /**
   * publicPath
   * @public
   */
  public publicPath = Option.String(`--publicPath`, undefined, {
    description: `public path of emitted assets`,
    env: `APP_PUBLIC_PATH`,
  })

  /**
   * runtime
   * @public
   */
  public runtime: `single` | `multiple` | boolean = Option.String(
    `--runtime`,
    undefined,
    {
      description: `Set runtime chunk`,
      validator: t.isOneOf([
        t.isLiteral(`single`),
        t.isLiteral(`multiple`),
        t.isBoolean(),
      ]),
    },
  )

  /**
   * splitChunks
   * @public
   */
  public splitChunks = Option.Boolean(
    `--splitChunks,--vendor`,
    undefined,
    {
      description: `Separate vendor bundle`,
    },
  )

  /**
   * storage
   * @public
   */
  public storage = Option.String(`--storage`, undefined, {
    description: `Storage directory (relative to project)`,
    env: `APP_PATH_STORAGE`,
  })

  /**
   * Context args object
   *
   * @public
   */
  public override get args(): Context[`args`] {
    return {
      browser: this.browser,
      cache: this.cache,
      ci: this.ci,
      clean: this.clean,
      debug: this.debug,
      discovery: this.discovery,
      devtool: this.devtool,
      editor: this.editor,
      esm: this.esm,
      flush: this.flush,
      hash: this.hash,
      html: this.html,
      immutable: this.immutable,
      indicator: this.indicator,
      input: this.input,
      output: this.output,
      manifest: this.manifest,
      minimize: this.minimize,
      mode: this.mode,
      notify: this.notify,
      overlay: this.overlay,
      publicPath: this.publicPath,
      reload: this.reload,
      runtime: this.runtime,
      splitChunks: this.splitChunks,
      storage: this.storage,
      target: this.filter,
    }
  }

  /**
   * Execute command
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async runCommand() {
    await this.applyEnv()
    await this.applyManifestOptions()
    await this.applyArgs()
    await this.app.processConfigs()
    await this.applyArgs()
    await this.app.run()
  }

  /**
   * Apply context from .env
   *
   * @public
   */
  @bind
  public async applyEnv() {
    if (this.app.env.isString(`APP_MODE`)) {
      this.app.hooks.on(
        `build.mode`,
        this.app.env.get<`development` | `production`>(`APP_MODE`),
      )
      this.app.success(
        `mode set to`,
        this.app.env.get(`APP_MODE`),
        `from environment`,
      )
    }

    if (this.app.env.isString(`APP_BASE_PATH`)) {
      this.app.context.basedir = this.app.env.get(`APP_BASE_PATH`)
      this.app.success(
        `project base path set to`,
        this.app.env.get(`APP_BASE_PATH`),
        `from environment`,
      )
    }

    if (this.app.env.isString(`APP_PUBLIC_PATH`)) {
      this.app.hooks.on(
        `build.output.publicPath`,
        this.app.env.get(`APP_PUBLIC_PATH`),
      )
      this.app.success(
        `public path set to`,
        this.app.env.get(`APP_PUBLIC_PATH`),
        `from environment`,
      )
    }

    if (this.app.env.isString(`APP_SRC_PATH`)) {
      this.app.hooks.on(`location.@src`, this.app.env.get(`APP_SRC_PATH`))
      this.app.success(
        `src path set to`,
        this.app.env.get(`APP_SRC_PATH`),
        `from environment`,
      )
    }

    if (this.app.env.isString(`APP_DIST_PATH`)) {
      this.app.hooks.on(
        `location.@dist`,
        this.app.env.get(`APP_DIST_PATH`),
      )

      this.app.success(
        `dist path set to`,
        this.app.env.get(`APP_DIST_PATH`),
        `from environment`,
      )
    }

    if (this.app.env.isString(`APP_STORAGE_PATH`)) {
      this.app.hooks.on(
        `location.@storage`,
        this.app.env.get(`APP_STORAGE_PATH`),
      )

      this.app.success(
        `storage path set to`,
        this.app.env.get(`APP_STORAGE_PATH`),
        `from environment`,
      )
    }
  }

  /**
   * Apply context from `package.json`
   *
   * @public
   */
  @bind
  public async applyManifestOptions() {
    if (isset(this.app.context.manifest?.bud?.[`publicPath`]))
      this.app.hooks.on(
        `build.output.publicPath`,
        this.app.context.manifest.bud[`publicPath`],
      )

    if (isset(this.app.context.manifest?.bud?.paths?.[`src`]))
      this.app.hooks.on(
        `location.@src`,
        this.app.context.manifest.bud.paths[`src`],
      )

    if (isset(this.app.context.manifest?.bud?.paths?.[`dist`]))
      this.app.hooks.on(
        `location.@dist`,
        this.app.context.manifest.bud.paths[`dist`],
      )

    if (isset(this.app.context.manifest?.bud?.paths?.[`storage`]))
      this.app.hooks.on(
        `location.@storage`,
        this.app.context.manifest.bud.paths[`storage`],
      )
  }

  /**
   * Apply context from argv
   *
   * @public
   */
  @bind
  public async applyArgs() {
    if (isset(this.context.args.input))
      this.app.setPath(`@src`, this.input)
    if (isset(this.context.args.output))
      this.app.setPath(`@dist`, this.output)

    if (isset(this.manifest)) {
      this.app.log(`overriding manifest setting from cli`)
      this.app.hooks.on(`feature.manifest`, this.manifest)
    }
    if (isset(this.publicPath)) {
      this.app.setPublicPath(this.publicPath)
    }

    if (
      this.app.isRoot &&
      isset(this.filter) &&
      this.app.children &&
      Object.keys(this.app.children).length > 0
    ) {
      Object.keys(this.app.children)
        .filter(name => !this.filter.includes(name))
        .map(name => {
          delete this.app.children[name]
          this.app.log(`removing ${name} instance from the cli`)
        })
    }

    if (isset(this.storage)) {
      this.app.log(`overriding storage directory from the cli`)
      this.app.setPath(`@storage`, this.storage)
    }

    if (isset(this.mode)) {
      this.app.log(`overriding mode from the cli`)
      this.app.hooks.on(`build.mode`, this.mode)
    }

    if (isset(this.cache)) {
      this.app.log(`overriding cache settings from cli`)
      this.app.persist(this.cache)
      this.app.children &&
        Object.values(this.app.children).map(child =>
          child.persist(this.cache),
        )
    }

    if (isset(this.minimize)) {
      this.app.log(`overriding minimize setting from cli`)
      this.app.minimize(this.minimize)
      this.app.children &&
        Object.values(this.app.children).map(child =>
          child.minimize(this.minimize),
        )
    }

    if (isset(this.devtool)) {
      this.app.log(`overriding devtool from cli`)
      this.app.devtool(this.devtool)
      this.app.children &&
        Object.values(this.app.children).map(child =>
          child.devtool(this.devtool),
        )
    }

    if (isset(this.esm)) {
      this.app.log(`overriding esm from cli`)
      this.app.esm.enable(this.esm)
      this.app.children &&
        Object.values(this.app.children).map(child =>
          child.esm.enable(this.esm),
        )
    }

    if (isset(this.immutable)) {
      this.app.log(`overriding immutable from cli`)
      this.app.cdn.freeze(this.immutable)
      this.app.children &&
        Object.values(this.app.children).map(child =>
          child.cdn.freeze(this.immutable),
        )
    }

    if (isset(this.clean)) {
      this.app.log(`overriding clean setting from cli`)
      this.app.extensions
        .get(`@roots/bud-extensions/clean-webpack-plugin`)
        .enable(this.clean)

      this.app.hooks.on(`build.output.clean`, this.clean)
    }

    if (isset(this.hash)) {
      this.app.log(`overriding hash setting from cli`)
      this.app.hash(this.hash)
      this.app.children &&
        Object.values(this.app.children).map(child =>
          child.persist(this.cache),
        )
    }
    if (isset(this.html)) {
      isString(this.html)
        ? this.app.html({template: this.html})
        : this.app.html()

      this.app.children &&
        Object.values(this.app.children).map(child =>
          isString(this.html)
            ? child.html({template: this.html})
            : child.html(),
        )
    }

    if (isset(this.runtime)) {
      this.app.log(`overriding runtime setting from cli`)
      this.app.runtime(this.runtime)
      this.app.children &&
        Object.values(this.app.children).map(child =>
          child.runtime(this.runtime),
        )
    }

    if (isset(this.splitChunks)) {
      this.app.log(`overriding runtime setting from cli`)
      this.app.splitChunks(this.splitChunks)
      this.app.children &&
        Object.values(this.app.children).map(child =>
          child.splitChunks(this.splitChunks),
        )
    }

    await this.app.api.processQueue()
  }
}
