import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import type {Context} from '@roots/bud-framework/options/context'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import * as t from '@roots/bud-support/typanion'

/**
 * Build command
 *
 * @public
 */
export default class BudBuildCommand extends BudCommand {
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
  public declare browser?: boolean | string

  /**
   * hot
   * @virtual
   * @public
   */
  public declare hot?: boolean

  /**
   * reload
   * @virtual
   * @public
   */
  public declare reload?: boolean

  /**
   * overlay
   * @virtual
   * @public
   */
  public declare overlay?: boolean

  /**
   * indicator
   * @virtual
   * @public
   */
  public indicator?: boolean

  /**
   * cache
   */
  public override cache = Option.String(`--cache`, undefined, {
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
   * clean
   * @public
   */
  public override clean = Option.Boolean(`--clean`, undefined, {
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
  public override devtool = Option.String(`--devtool`, undefined, {
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
  public override esm = Option.Boolean(`--esm`, undefined, {
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
  public override hash = Option.Boolean(`--hash`, undefined, {
    description: `Hash compiled filenames`,
  })

  /**
   * html
   * @public
   */
  public override html = Option.String(`--html`, undefined, {
    description: `Generate an html template`,
    tolerateBoolean: true,
  })

  /**
   * immutable
   * @public
   */
  public override immutable = Option.Boolean(`--immutable`, undefined, {
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
  public override manifest = Option.Boolean(`--manifest`, undefined, {
    description: `Generate a manifest of compiled assets`,
  })

  /**
   * minimize
   * @public
   */
  public override minimize = Option.Boolean(`--minimize`, undefined, {
    description: `Minimize compiled assets`,
  })

  /**
   * src
   * @public
   */
  public override input = Option.String(
    `--input,-i,--@src,--src`,
    undefined,
    {
      description: `Source directory (relative to project)`,
      env: `APP_PATH_INPUT`,
    },
  )

  /**
   * dist
   * @public
   */
  public override output = Option.String(
    `--output,-o,--@dist,--dist`,
    undefined,
    {
      description: `Distribution directory (relative to project)`,
      env: `APP_PATH_OUTPUT`,
    },
  )

  /**
   * publicPath
   * @public
   */
  public override publicPath = Option.String(`--publicPath`, undefined, {
    description: `public path of emitted assets`,
    env: `APP_PUBLIC_PATH`,
  })

  /**
   * runtime
   * @public
   */
  public override runtime: `single` | `multiple` | boolean = Option.String(
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
  public override splitChunks = Option.Boolean(
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
  public override storage = Option.String(`--storage`, undefined, {
    description: `Storage directory (relative to project)`,
    env: `APP_PATH_STORAGE`,
  })

  /**
   * ci
   */
  public ci = Option.Boolean(`--ci`, undefined, {
    description: `Simple build summaries for CI`,
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
  public override async runCommand(bud: Bud) {
    await this.applyEnv(bud)
    await this.applyManifestOptions(bud)
    await this.applyArgs(bud)
    await bud.processConfigs()
    await this.applyArgs(bud)
    await bud.run()
  }
}
