import {platform} from 'node:os'

import {checkDependencies} from '@roots/bud/cli/helpers/checkDependencies'
import {checkPackageManagerErrors} from '@roots/bud/cli/helpers/checkPackageManagerErrors'
import {isset} from '@roots/bud/cli/helpers/isset'
import {Bud} from '@roots/bud-framework'
import type {
  CommandContext,
  Context,
} from '@roots/bud-framework/options/context'
import {BaseContext, Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import Ink, {React, Renderer} from '@roots/bud-support/ink'
import isString from '@roots/bud-support/lodash/isString'
import * as t from '@roots/bud-support/typanion'

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

  public cwd = Option.String(`--basedir,--cwd`, undefined, {
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

  public declare renderer: Renderer
  public async render(children: React.ReactElement) {
    await this.renderer?.render(children)
  }
  public async renderOnce(children: React.ReactElement) {
    await this.renderer?.once(children)
  }
  public async text(text: string) {
    await this.renderer?.text(text)
  }

  public constructor() {
    super()
    this.renderer = new Renderer(process.stdout)
  }

  public async makeBud<T extends BudCommand>(command: T) {
    command.context.mode = command.mode ?? command.context.mode

    command.context.args = Object.entries({
      ...command.context.args,
      basedir: command.context.basedir,
      debug: command.debug,
      filter: command.filter,
      log: command.log,
      notify: command.notify,
      target: command.filter,
      verbose: command.verbose,
    })
      .filter(([k, v]) => v !== undefined)
      .reduce((acc, [k, v]) => {
        acc[k] = v
        return acc
      }, {} as Record<string, unknown>)

    if (command.withArguments) {
      command.context.args = await command.withArguments(
        command.context.args,
      )
    }

    if (command.withContext) {
      command.context = await command.withContext(command.context)
    }

    if (command.context.mode === `development`) {
      await import(`../env.development.js`)
    } else {
      await import(`../env.production.js`)
    }

    const bud = await new Bud().lifecycle(command.context)

    bud.dashboard.setRenderer(this.renderer)

    if (!bud.isCLI()) throw new Error(`problem instantiating bud`)

    command.bud = bud

    await command.applyBudEnv(command.bud)
    await command.applyBudManifestOptions(command.bud)
    await command.applyBudArguments(command.bud)

    await command.bud.api.processQueue()

    await command.bud.processConfigs()

    if (command.withBud) {
      command.bud = await command.withBud(command.bud)
    }

    await command.applyBudArguments(command.bud)
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
    checkPackageManagerErrors(command.bud)
    await checkDependencies(command.bud)
  }

  @bind
  public async applyBudEnv(bud: Bud) {
    if (bud.env.isString(`APP_MODE`)) {
      bud.hooks.on(`build.mode`, bud.env.get(`APP_MODE`))
      bud.success(
        `mode set to`,
        bud.env.get(`APP_MODE`),
        `from environment`,
      )
    }
    if (bud.env.isString(`APP_BASE_PATH`)) {
      bud.context.basedir = bud.env.get(`APP_BASE_PATH`)
      bud.success(
        `project base path set to`,
        bud.env.get(`APP_BASE_PATH`),
        `from environment`,
      )
    }
    if (bud.env.isString(`APP_PUBLIC_PATH`)) {
      bud.hooks.on(
        `build.output.publicPath`,
        bud.env.get(`APP_PUBLIC_PATH`),
      )
      bud.success(
        `public path set to`,
        bud.env.get(`APP_PUBLIC_PATH`),
        `from environment`,
      )
    }
    if (bud.env.isString(`APP_SRC_PATH`)) {
      bud.hooks.on(`location.@src`, bud.env.get(`APP_SRC_PATH`))
      bud.success(
        `src path set to`,
        bud.env.get(`APP_SRC_PATH`),
        `from environment`,
      )
    }
    if (bud.env.isString(`APP_DIST_PATH`)) {
      bud.hooks.on(`location.@dist`, bud.env.get(`APP_DIST_PATH`))

      bud.success(
        `dist path set to`,
        bud.env.get(`APP_DIST_PATH`),
        `from environment`,
      )
    }
    if (bud.env.isString(`APP_STORAGE_PATH`)) {
      bud.hooks.on(`location.@storage`, bud.env.get(`APP_STORAGE_PATH`))

      bud.success(
        `storage path set to`,
        bud.env.get(`APP_STORAGE_PATH`),
        `from environment`,
      )
    }
  }

  @bind
  public async applyBudManifestOptions(bud: Bud) {
    const {bud: manifest} = bud.context.manifest
    if (!manifest) return

    if (isset(manifest.publicPath))
      bud.hooks.on(`build.output.publicPath`, manifest.bud.publicPath)

    if (isset(manifest.paths?.src))
      bud.hooks.on(`location.@src`, manifest.bud.paths.src)

    if (isset(manifest.paths?.dist))
      bud.hooks.on(`location.@dist`, manifest.bud.paths.dist)

    if (isset(manifest.paths?.[`storage`]))
      bud.hooks.on(`location.@storage`, manifest.bud.paths[`storage`])
  }

  /**
   * Apply context from argv
   *
   * @public
   */
  @bind
  public async applyBudArguments(bud: BudCommand[`bud`]) {
    const {args, logger} = bud.context

    if (isset(args.input)) bud.setPath(`@src`, args.input)
    if (isset(args.output)) bud.setPath(`@dist`, args.output)
    if (isset(args.publicPath)) bud.setPublicPath(args.publicPath)
    if (isset(args.storage)) bud.setPath(`@storage`, args.storage)
    if (isset(args.modules)) bud.setPath(`@modules`, args.modules)

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
    const override = (override: (bud: Bud) => void) =>
      bud.hasChildren
        ? Object.values(bud.children).map(child => override(child))
        : override(bud)

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
  public override async catch(value: unknown) {
    let error: Error
    process.exitCode = 1

    const normalizeError = (value: unknown): Error => {
      if (value instanceof Error) return value
      if (isString(value)) return new Error(value.trim())

      if (value instanceof Object) {
        try {
          if (isString(error.message))
            return new Error(error.message.trim())
          return new Error(JSON.stringify(value, null, 2))
        } catch (error) {
          return new Error(value.toString().trim())
        }
      }
    }

    try {
      error = normalizeError(value)
    } catch (e) {}

    if (this.bud?.notifier?.notify) {
      try {
        this.bud.notifier.notify({
          title: this.bud.label ?? `bud.js`,
          subtitle: error.name ?? `Error`,
          message: error.message,
          group: this.bud.label,
        })
      } catch (error) {
        // fallthrough
      }
    }

    try {
      await this.renderOnce(
        <Ink.Box flexDirection="column">
          <Display.Error name={error.name} message={error.message} />

          {isWindows() ? <WinError /> : null}
        </Ink.Box>,
      )
    } catch (error) {}
  }
}
