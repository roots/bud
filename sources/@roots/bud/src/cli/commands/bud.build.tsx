import type {CommandContext} from '@roots/bud/cli/commands/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import * as t from '@roots/bud-support/typanion'

/**
 * Build command
 *
 * @public
 */
export default class BudBuildCommand extends BudCommand {
  public static override paths = [[`build`]]
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

  public override withBud = async (bud: BudCommand[`bud`]) => {
    if (this.notify && this.notifier) {
      bud.hooks.action(`compiler.close`, async bud => {
        await this.notifier.compilationNotification()
      })
    }

    return bud
  }

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
  public clean = Option.Boolean(`--clean`, undefined, {
    description: `Clean artifacts and distributables prior to compilation`,
  })
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
  public editor = Option.String(`--editor`, undefined, {
    description: `Open editor to file containing errors on unsuccessful development build`,
    tolerateBoolean: true,
  })
  public esm = Option.Boolean(`--esm`, undefined, {
    description: `build as es modules`,
  })
  public flush = Option.Boolean(`--flush`, undefined, {
    description: `Force clearing bud internal cache`,
  })
  public hash = Option.Boolean(`--hash`, undefined, {
    description: `Hash compiled filenames`,
  })
  public html = Option.String(`--html`, undefined, {
    description: `Generate an html template`,
    tolerateBoolean: true,
  })
  public immutable = Option.Boolean(`--immutable`, undefined, {
    description: `bud.http: immutable module lockfile`,
  })
  public discovery = Option.Boolean(`--discovery`, undefined, {
    description: `Automatically register extensions`,
  })
  public override notify = Option.Boolean(`--notify`, true, {
    description: `Enable notfication center messages`,
  })
  public manifest = Option.Boolean(`--manifest`, undefined, {
    description: `Generate a manifest of compiled assets`,
  })
  public minimize = Option.Boolean(`--minimize`, undefined, {
    description: `Minimize compiled assets`,
  })
  public input = Option.String(`--input,-i,--@src,--src`, undefined, {
    description: `Source directory (relative to project)`,
    env: `APP_PATH_INPUT`,
  })
  public output = Option.String(`--output,-o,--@dist,--dist`, undefined, {
    description: `Distribution directory (relative to project)`,
    env: `APP_PATH_OUTPUT`,
  })
  public publicPath = Option.String(`--publicPath`, undefined, {
    description: `public path of emitted assets`,
    env: `APP_PUBLIC_PATH`,
  })
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
  public splitChunks = Option.Boolean(
    `--splitChunks,--vendor`,
    undefined,
    {
      description: `Separate vendor bundle`,
    },
  )
  public storage = Option.String(`--storage`, undefined, {
    description: `Storage directory (relative to project)`,
    env: `APP_PATH_STORAGE`,
  })
  public ci = Option.Boolean(`--ci`, undefined, {
    description: `Simple build summaries for CI`,
  })

  public override withContext = async (context: CommandContext) => {
    if (this.withSubcommandContext) {
      context = await this.withSubcommandContext(context)
    }
    return context
  }

  public override withArguments = async (
    args: BudCommand[`bud`][`context`][`args`],
  ) => {
    if (this.withSubcommandArguments) {
      args = await this.withSubcommandArguments(args)
    }

    return {
      ...args,
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
      input: this.input,
      output: this.output,
      manifest: this.manifest,
      minimize: this.minimize,
      mode: this.mode,
      notify: this.notify,
      publicPath: this.publicPath,
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
  public override async execute() {
    await this.makeBud(this)
    await this.healthcheck(this)
    await this.run(this)
  }
}
