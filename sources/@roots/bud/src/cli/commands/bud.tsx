/* eslint-disable n/no-process-exit */
import {platform} from 'node:os'

import {checkDependencies} from '@roots/bud/cli/helpers/checkDependencies'
import {checkPackageManagerErrors} from '@roots/bud/cli/helpers/checkPackageManagerErrors'
import {isset} from '@roots/bud/cli/helpers/isset'
import * as instances from '@roots/bud/instances'
import {Bud} from '@roots/bud-framework'
import type {
  CommandContext,
  Context,
} from '@roots/bud-framework/options/context'
import {BaseContext, Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {BudError, BudHandler} from '@roots/bud-support/errors'
import isString from '@roots/bud-support/lodash/isString'
import * as t from '@roots/bud-support/typanion'
import * as Ink from 'ink'

import * as Display from '../components/Error.js'
import {Menu} from '../components/Menu.js'
import {WinError} from '../components/WinError.js'
import {isWindows} from '../helpers/isWindows.js'

export type {BaseContext, CommandContext, Context}
export {Option}

export interface ArgsModifier {
  <T extends CommandContext[`args`]>(from: T): (on: T) => Promise<T>
}
export const ArgsModifier: ArgsModifier = from => async on => ({
  ...from,
  ...on,
})

/**
 * Bud command
 */
export default class BudCommand extends Command<CommandContext> {
  /**
   * Bud instance
   */
  public declare bud?: (Bud & {context: CommandContext}) | undefined

  /**
   * Binary (node, ts-node, bun)
   */
  public get bin() {
    // eslint-disable-next-line n/no-process-env
    return process.env.BUD_JS_BIN
  }

  /**
   * {@link Command.context}
   */
  public declare context: CommandContext

  /**
   * {@link Command.paths}
   */
  public static override paths = [[]]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    description: `Run \`bud --help\` for usage information`,
    details: `\
      \`bud build production\` compiles source assets in \`production\` mode. Run \`bud build production --help\` for usage.

      \`bud build development\` compiles source assets in \`development\` mode and serves updated modules. Run \`bud build development --help\` for usage.
    `,
    examples: [[`compile source assets`, `$0 build`]],
  })

  public declare withArguments?: (
    args: CommandContext[`args`],
  ) => Promise<CommandContext[`args`]>

  public declare withSubcommandArguments?: (
    args: CommandContext[`args`],
  ) => Promise<CommandContext[`args`]>

  public declare withContext?: (
    context: CommandContext,
  ) => Promise<CommandContext>

  public declare withSubcommandContext?: (
    context: CommandContext,
  ) => Promise<CommandContext>

  public declare withBud?: (
    bud: BudCommand[`bud`],
  ) => Promise<BudCommand[`bud`]>

  public notify: boolean = Option.Boolean(
    `--notify`,
    platform() === `darwin`,
    {
      description: `Enable notification (default on macOS, experimental on other platforms)`,
    },
  )

  public basedir = Option.String(`--basedir,--cwd`, undefined, {
    description: `project base directory`,
    hidden: true,
  })

  public debug = Option.Boolean(`--debug`, undefined, {
    description: `Enable debug mode`,
  })

  public log = Option.Boolean(`--log`, undefined, {
    description: `Enable logging`,
    hidden: true,
  })

  public verbose = Option.Boolean(`--verbose`, undefined, {
    description: `Log verbose output`,
  })

  public mode = Option.String(`--mode`, undefined, {
    description: `Compilation mode`,
    validator: t.isOneOf([
      t.isLiteral(`production`),
      t.isLiteral(`development`),
    ]),
  })

  public filter = Option.Array(`--filter`, undefined, {
    description: `Limit command to particular compilers`,
  })

  public render(children: React.ReactElement) {
    Ink?.render(children)
  }

  public async renderStatic(...children: Array<React.ReactElement>) {
    return Ink?.render(
      <Ink.Static items={children}>
        {(child, id) => <Ink.Box key={id}>{child}</Ink.Box>}
      </Ink.Static>,
    ).unmount()
  }

  public async makeBud<T extends BudCommand>(command?: T) {
    this.context.mode = this.mode ?? this.context.mode
    this.context.args = Object.entries({
      ...this.context.args,
      basedir: this.context.basedir,
      debug: this.debug,
      filter: this.filter,
      log: this.log,
      notify: this.notify,
      target: this.filter,
      verbose: this.verbose,
    })
      .filter(([k, v]) => v !== undefined)
      .reduce(
        (acc, [k, v]) => ({
          ...acc,
          [k]: v,
        }),
        {},
      ) as CommandContext[`args`]

    if (this.withArguments) {
      this.context.args = await this.withArguments(this.context.args)
    }

    if (this.withContext) {
      this.context = await this.withContext(this.context)
    }

    if (this.context.mode === `development`) {
      await import(`../env.development.js`)
    } else {
      await import(`../env.production.js`)
    }

    this.bud = instances.get() as Bud & {
      context: CommandContext
    }

    try {
      await this.bud.lifecycle(this.context)
    } catch (err) {
      if (err.isBudError) throw err
      throw BudError.normalize(err)
    }

    this.bud.hooks.action(`build.before`, async bud => {
      if (!bud.isCLI()) return
      await this.applyBudEnv(bud)
      await bud.api.processQueue()
    })

    await this.applyBudEnv(this.bud)
    await this.applyBudManifestOptions(this.bud)
    await this.applyBudArguments(this.bud)

    if (this.withBud) await this.withBud(this.bud)
    await this.bud.processConfigs()

    await this.applyBudArguments(this.bud)
    return this.bud
  }

  @bind
  public async $(bin: string, args: Array<string>, options = {}) {
    const {execa: command} = await import(`@roots/bud-support/execa`)
    return await command(bin, args.filter(Boolean), {
      cwd: this.bud.path(),
      encoding: `utf8`,
      env: {NODE_ENV: `development`},
      stdio: `inherit`,
      ...options,
    })
  }

  public async healthcheck(command: BudCommand) {
    try {
      checkPackageManagerErrors(command.bud)
      await checkDependencies(command.bud)
    } catch (e) {}
  }

  @bind
  public async applyBudEnv(bud: Bud) {
    bud
      .when(bud.env.isString(`APP_MODE`), ({hooks}) =>
        hooks.on(`build.mode`, bud.env.get(`APP_MODE`)),
      )
      .when(
        bud.env.isString(`APP_BASE_PATH`),
        bud => (bud.context.basedir = bud.env.get(`APP_BASE_PATH`)),
      )
      .when(bud.env.isString(`APP_PUBLIC_PATH`), ({hooks}) =>
        hooks.on(
          `build.output.publicPath`,
          bud.env.get(`APP_PUBLIC_PATH`),
        ),
      )
      .when(bud.env.isString(`APP_SRC_PATH`), ({hooks}) =>
        hooks.on(`location.@src`, bud.env.get(`APP_SRC_PATH`)),
      )
      .when(bud.env.isString(`APP_DIST_PATH`), ({hooks}) =>
        hooks.on(`location.@dist`, bud.env.get(`APP_DIST_PATH`)),
      )
      .when(bud.env.isString(`APP_STORAGE_PATH`), ({hooks}) =>
        hooks.on(`location.@storage`, bud.env.get(`APP_STORAGE_PATH`)),
      )
  }

  @bind
  public async applyBudManifestOptions(bud: Bud) {
    const {bud: manifest} = bud.context.manifest
    if (!manifest) return

    bud
      .when(isset(manifest.publicPath), bud =>
        bud.hooks.on(`build.output.publicPath`, manifest.bud.publicPath),
      )
      .when(isset(manifest.paths?.src), bud =>
        bud.hooks.on(`location.@src`, manifest.bud.paths.src),
      )
      .when(isset(manifest.paths?.dist), bud =>
        bud.hooks.on(`location.@dist`, manifest.bud.paths.dist),
      )
      .when(isset(manifest.paths?.storage), bud =>
        bud.hooks.on(`location.@storage`, manifest.bud.paths.storage),
      )
  }

  /**
   * Apply context from argv
   */
  @bind
  public async applyBudArguments(bud: BudCommand[`bud`]) {
    const {args, logger} = bud.context

    isset(args.input) && bud.setPath(`@src`, args.input)
    isset(args.output) && bud.setPath(`@dist`, args.output)
    isset(args.publicPath) && bud.setPublicPath(args.publicPath)
    isset(args.modules) && bud.setPath(`@modules`, args.modules)

    if (isset(args.hot)) {
      bud.log(`disabling hot module replacement`)
      bud.hooks.on(`dev.middleware.enabled`, (middleware = []) =>
        middleware.filter(key =>
          args.hot === false ? key !== `hot` : args.hot,
        ),
      )
    }

    if (isset(args.port)) {
      bud.log(`overriding port from cli`)
      bud.hooks.on(`dev.url`, (url = new URL(`http://0.0.0.0:3000`)) => {
        url.port = args.port
        return url
      })
    }

    if (isset(args.proxy)) {
      bud.log(`overriding proxy from cli`)
      bud.hooks.on(
        `dev.middleware.proxy.options.target`,
        new URL(args.proxy),
      )
    }

    /**
     * Override settings for either:
     * - the parent (if children do not exist), or;
     * - all children but not the parent (if children exist)
     */
    const override = (override: (bud: Bud) => void) => {
      bud.hasChildren
        ? Object.values(bud.children).map(child => override(child))
        : override(bud)
    }

    if (isset(args.manifest)) {
      bud.log(`overriding manifest setting from cli`)
      override(bud => bud.manifest.enable(args.manifest))
    }

    if (isset(args.cache)) {
      bud.log(`overriding cache settings from cli`)
      override(bud => bud.persist(args.cache))
    }

    if (isset(args.minimize)) {
      bud.log(`overriding minimize setting from cli`)
      override(bud => bud.minimize(args.minimize))
    }

    if (isset(args.devtool)) {
      bud.log(`overriding devtool from cli`)
      override(bud => bud.devtool(args.devtool))
    }

    if (isset(args.esm)) {
      bud.log(`overriding esm from cli`)
      override((bud: Bud) => bud.esm.enable(args.esm))
    }

    if (isset(args.immutable)) {
      bud.log(`overriding immutable from cli`)
      override((bud: Bud) => bud.cdn.freeze(args.immutable))
    }

    if (isset(args.clean)) {
      bud.log(`overriding clean setting from cli`)
      override((bud: Bud) => {
        bud.extensions
          .get(`@roots/bud-extensions/clean-webpack-plugin`)
          .enable(args.clean)

        bud.hooks.on(`build.output.clean`, args.clean)
      })
    }

    if (isset(args.hash)) {
      logger.log(`overriding hash setting from cli`)
      override((bud: Bud) => bud.hash(args.hash))
    }

    if (isset(args.html)) {
      logger.log(`overriding html setting from cli`)
      override((bud: Bud) =>
        isString(args.html) ? bud.html({template: args.html}) : bud.html(),
      )
    }

    if (isset(args.runtime)) {
      bud.log(`overriding runtime setting from cli`)
      override((bud: Bud) => bud.runtime(args.runtime))
    }

    if (isset(args.splitChunks)) {
      bud.log(`overriding splitChunks setting from cli`)
      override((bud: Bud) => bud.splitChunks(args.splitChunks))
    }

    if (args.use) {
      await bud.extensions.add(args.use as any)
    }

    await bud.api.processQueue()
    if (bud.children) {
      await Promise.all(
        Object.values(bud.children).map(async ({api}) =>
          api.processQueue(),
        ),
      )
    }
  }

  /**
   * Execute command
   */
  public async execute() {
    this.render(<Menu cli={this.cli} />)
  }

  /**
   * Handle errors
   */
  public override async catch(err: BudHandler) {
    process.exitCode = 1

    let error: BudHandler
    if (isString(err)) error = BudError.normalize(err)
    else if (err.isBudError) error = err

    if (this.bud?.notifier?.notify) {
      try {
        this.bud.notifier.notify({
          title: this.bud.label ?? `bud.js`,
          subtitle: error?.name ?? `Error`,
          message: error?.message,
          group: this.bud.label,
        })
      } catch (error) {}
    }

    try {
      await this.renderStatic(
        <Ink.Box flexDirection="column">
          <Display.Error error={error} />
          {isWindows() ? <WinError /> : null}
        </Ink.Box>,
      )
      if (this.bud.isProduction) process.exit(1)
    } catch (e) {
      if (error.message) process.stderr.write(error.message.concat(`\n`))
      if (err.message) process.stderr.write(err.message.concat(`\n`))
      if (this.bud.isProduction) process.exit(1)
    }
  }
}
