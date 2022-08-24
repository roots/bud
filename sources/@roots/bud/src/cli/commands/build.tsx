import {Command, Option} from 'clipanion'
import {bind} from 'helpful-decorators'
import * as t from 'typanion'

import {factory} from '../../factory/index.js'
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
   * --browser
   */
  public browser = Option.Boolean(`--browser`, undefined, {
    description: `Open browser on successful development build`,
  })

  /**
   * --cache
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
   * --ci
   */
  public ci = Option.Boolean(`--ci`, undefined, {
    description: `Simple build summaries for CI`,
  })

  /**
   * --clean
   */
  public clean = Option.Boolean(`--clean`, undefined, {
    description: `Clean artifacts and distributables prior to compilation`,
  })

  /**
   * --debug
   */
  public debug = Option.Boolean(`--debug`, undefined, {
    description: `Write debug files to storage directory`,
  })

  /**
   * --devtool
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
   * --notify
   */
  public editor = Option.Boolean(`--editor`, undefined, {
    description: `Open editor to file containing errors on unsuccessful development build`,
  })

  /**
   * --esm
   */
  public esm = Option.Boolean(`--esm`, undefined, {
    description: `build as es modules`,
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
    description: `Hash compiled filenames`,
  })

  /**
   * --html
   */
  public html = Option.String(`--html`, undefined, {
    description: `Generate an html template`,
    tolerateBoolean: true,
  })

  /**
   * --immutable
   */
  public immutable = Option.Boolean(`--immutable`, undefined, {
    description: `bud.http: immutable module lockfile`,
  })

  /**
   * --indicator
   */
  public indicator = Option.Boolean(`--indicator`, undefined, {
    description: `Enable development status indicator`,
  })

  /**
   * --inject
   */
  public inject = Option.Boolean(`--inject`, undefined, {
    description: `Automatically inject extensions`,
    hidden: true,
  })

  /**
   * --input
   */
  public input = Option.String(`--input,-i,--src`, undefined, {
    description: `Source directory (relative to project)`,
    env: `APP_PATH_INPUT`,
  })

  /*
   * --dist
   */
  public output = Option.String(`--output,-o,--dist`, undefined, {
    description: `Distribution directory (relative to project)`,
    env: `APP_PATH_OUTPUT`,
  })

  /**
   * --mode
   */
  public mode = Option.String(`--mode`, undefined, {
    description: `Compilation mode`,
    validator: t.isOneOf([
      t.isLiteral(`production`),
      t.isLiteral(`development`),
    ]),
    env: `APP_MODE`,
  })

  /**
   * --manifest
   */
  public manifest = Option.Boolean(`--manifest`, undefined, {
    description: `Generate a manifest of compiled assets`,
  })

  /**
   * --minimize
   */
  public minimize = Option.Boolean(`--minimize`, undefined, {
    description: `Minimize compiled assets`,
  })

  /**
   * --notify
   */
  public notify = Option.Boolean(`--notify`, undefined, {
    description: `Enable notfication center messages`,
  })

  /**
   * --overlay
   */
  public overlay = Option.Boolean(`--overlay`, undefined, {
    description: `Enable error overlay in development mode`,
  })

  /**
   * --publicPath
   */
  public publicPath = Option.String(`--publicPath`, undefined, {
    description: `public path of emitted assets`,
    env: `APP_PUBLIC_PATH`,
  })

  /**
   * --reload
   */
  public reload = Option.Boolean(`--reload`, undefined, {
    description: `Reload browser on unrecoverable error`,
  })

  /**
   * --splitChunks
   */
  public splitChunks = Option.Boolean(
    `--splitChunks,--vendor`,
    undefined,
    {
      description: `Separate vendor bundle`,
    },
  )

  /**
   * --storage
   */
  public storage = Option.String(`--storage`, undefined, {
    description: `Storage directory (relative to project)`,
    env: `APP_PATH_STORAGE`,
  })

  /**
   * --target
   */
  public target = Option.Array(`--target,-t`, undefined, {
    description: `Limit compilation to particular compilers`,
  })

  /**
   * Execute command
   */
  @bind
  public async runCommand() {
    this.context.args = {
      browser: this.browser,
      cache: this.cache,
      ci: this.ci,
      clean: this.clean,
      debug: this.debug,
      devtool: this.devtool,
      dry: this.dry,
      output: this.output,
      editor: this.editor,
      esm: this.esm,
      flush: this.flush,
      hash: this.hash,
      html: this.html,
      immutable: this.immutable,
      indicator: this.indicator,
      input: this.input,
      level: this.level,
      log: this.log,
      manifest: this.manifest,
      minimize: this.minimize,
      mode: this.mode,
      notify: this.notify,
      overlay: this.overlay,
      publicPath: this.publicPath,
      reload: this.reload,
      splitChunks: this.splitChunks,
      target: this.target,
    }

    this.app = await factory(this.context)

    await this.make()
    await this.app.run()
  }
}
