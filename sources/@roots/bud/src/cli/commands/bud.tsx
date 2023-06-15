import type {Context} from '@roots/bud-framework/options/context'
import type {BaseContext} from '@roots/bud-support/clipanion'

import {Console} from '@roots/bud-dashboard/console'
import {Bud} from '@roots/bud-framework'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, BudHandler} from '@roots/bud-support/errors'
import {Box, render, Static} from '@roots/bud-support/ink'
import isString from '@roots/bud-support/lodash/isString'
import omit from '@roots/bud-support/lodash/omit'
import logger from '@roots/bud-support/logger'
import basedir from '@roots/bud/cli/flags/basedir'
import color from '@roots/bud/cli/flags/color'
import debug from '@roots/bud/cli/flags/debug'
import dry from '@roots/bud/cli/flags/dry'
import filter from '@roots/bud/cli/flags/filter'
import log from '@roots/bud/cli/flags/log'
import mode from '@roots/bud/cli/flags/mode'
import notify from '@roots/bud/cli/flags/notify'
import silent from '@roots/bud/cli/flags/silent'
import verbose from '@roots/bud/cli/flags/verbose'
import {checkDependencies} from '@roots/bud/cli/helpers/checkDependencies'
import {isset} from '@roots/bud/cli/helpers/isset'
import * as instance from '@roots/bud/instance'

import type {CLIContext} from '../index.js'

import * as Display from '../components/Error.js'
import {Menu} from '../components/Menu.js'

export type {BaseContext, Context}
export {Option}

/**
 * Bud command
 */
export default class BudCommand extends Command<CLIContext> {
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

  public basedir = basedir

  /**
   * Bud instance
   */
  public declare bud?: Bud | undefined

  public color = color

  /**
   * {@link Command.context}
   */
  public declare context: CLIContext

  public debug = debug

  public dry = dry

  public filter = filter

  public log = log

  public mode = mode

  public notify = notify

  public render = render

  public silent = silent

  public verbose = verbose

  /**
   * withContext
   *
   * @remarks
   * For extending the context object from subcommands
   */
  public declare withContext?: (
    context: Omit<Context, `stderr` | `stdio` | `stdout`>,
  ) => Promise<Context>

  /**
   * withSubcommandContext
   *
   * @remaks
   * For extending the context object from subcommands
   */
  public declare withSubcommandContext?: (
    context: Context,
  ) => Promise<Context>

  /**
   * Execute arbitrary sh command with inherited stdio
   */
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

  /**
   * Apply context from argv to bud.js instance
   */
  @bind
  public async applyBudArguments(bud: BudCommand[`bud`]) {
    const {context} = bud

    isset(context.input) && bud.setPath(`@src`, context.input)
    isset(context.output) && bud.setPath(`@dist`, context.output)
    isset(context.publicPath) && bud.setPublicPath(context.publicPath)
    isset(context.modules) && bud.setPath(`@modules`, context.modules)

    if (isset(context.hot)) {
      bud.log(`disabling hot module replacement`)
      bud.hooks.on(`dev.middleware.enabled`, (middleware = []) =>
        middleware.filter(key =>
          context.hot === false ? key !== `hot` : context.hot,
        ),
      )
    }

    if (isset(context.port)) {
      bud.log(`overriding port from cli`)
      bud.hooks.on(`dev.url`, (url = new URL(`http://0.0.0.0:3000`)) => {
        url.port = context.port
        return url
      })
    }

    if (isset(context.proxy)) {
      bud.log(`overriding proxy from cli`)
      bud.hooks.on(
        `dev.middleware.proxy.options.target`,
        new URL(context.proxy),
      )
    }

    /**
     * Override settings:
     *
     * - when children: all children but not the parent
     * - when no children: the parent;
     */
    const override = (override: (bud: Bud) => void) => {
      bud.hasChildren
        ? Object.values(bud.children).map(child => override(child))
        : override(bud)
    }

    if (isset(context.cache)) {
      bud.log(`overriding cache settings from cli`)
      override(bud => bud.persist(context.cache))
    }

    if (isset(context.minimize)) {
      bud.log(`overriding minimize setting from cli`)
      override(bud => bud.minimize(context.minimize))
    }

    if (isset(context.devtool)) {
      bud.log(`overriding devtool from cli`)
      override(bud => bud.devtool(context.devtool))
    }

    if (isset(context.esm)) {
      bud.log(`overriding esm from cli`)
      override((bud: Bud) => bud.esm.enable(context.esm))
    }

    if (isset(context.immutable)) {
      bud.log(`overriding immutable from cli`)
      override((bud: Bud) => bud.cdn.freeze(context.immutable))
    }

    if (isset(context.clean)) {
      bud.log(`overriding clean setting from cli`)
      override((bud: Bud) => {
        bud.extensions
          .get(`@roots/bud-extensions/clean-webpack-plugin`)
          .enable(context.clean)

        bud.hooks.on(`build.output.clean`, context.clean)
      })
    }

    if (isset(context.hash)) {
      logger.log(`overriding hash setting from cli`)
      override((bud: Bud) => bud.hash(context.hash))
    }

    if (isset(context.html)) {
      logger.log(`overriding html setting from cli`)
      override((bud: Bud) =>
        isString(context.html)
          ? bud.html({template: context.html})
          : bud.html(context.html),
      )
    }

    if (isset(context.runtime)) {
      bud.log(`overriding runtime setting from cli`)
      override((bud: Bud) => bud.runtime(context.runtime))
    }

    if (isset(context.splitChunks)) {
      bud.log(`overriding splitChunks setting from cli`)
      override((bud: Bud) => bud.splitChunks(context.splitChunks))
    }

    if (context.use) {
      await bud.extensions.add(context.use as any)
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
   * Apply context from env to bud.js instance
   */
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

  /**
   * Apply context from manifest to bud.js instance
   */
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
   * Binary (node, ts-node, bun)
   *
   * @remarks
   * String like `node`, `ts-node`, or `bun`. For executing child
   * processes with the same binary as the parent.
   */
  public get bin() {
    // eslint-disable-next-line n/no-process-env
    return process.env.BUD_JS_BIN
  }

  /**
   * Handle errors
   */
  public override async catch(error: BudHandler): Promise<void> {
    global.process.exitCode = 1
    if (!error.isBudError) error = BudError.normalize(error)

    if (this.bud?.notifier?.notify) {
      try {
        this.bud.notifier.notify({
          group: this.bud.label,
          message: error?.message,
          subtitle: error?.name ?? `Error`,
          title: this.bud.label ?? `bud.js`,
        })
      } catch (error) {
        logger.warn(error.message ?? error)
      }
    }

    try {
      const queuedMessages =
        this.bud?.consoleBuffer?.fetchAndRemove() ?? []

      if (queuedMessages.length) {
        await this.renderStatic(
          <Box flexDirection="column">
            <Console messages={queuedMessages} />
          </Box>,
        )
      }
    } catch (error) {
      logger.warn(error.message ?? error)
    }

    await this.renderStatic(
      <Box flexDirection="column">
        <Display.Error error={error} />
      </Box>,
    ).catch(error => {
      logger.warn(error.message ?? error)
    })

    if (this.bud.isProduction) global.process.exit(1)
  }

  /**
   * {@link Command.execute}
   */
  public async execute() {
    this.render(<Menu cli={this.cli} />)
  }

  public async makeBud() {
    const context = {
      basedir: this.basedir,
      color: this.color,
      debug: this.debug,
      dry: this.dry,
      filter: this.filter,
      log: this.log,
      mode: this.mode,
      notify: this.notify,
      silent: this.silent,
      target: this.filter,
      verbose: this.verbose,
      ...omit(this.context, [`stdin`, `stdout`, `stderr`, `colorDepth`]),
    }

    Object.assign(
      this.context,
      this.withContext ? await this.withContext(context) : context,
    )
    checkDependencies(this.context)

    await import(`../env.${this.context.mode}.js`)

    this.bud = instance.get()

    logger.info(`bud.js configured with`, context)

    try {
      await this.bud.lifecycle(
        omit(this.context, [
          `stdin`,
          `stdout`,
          `stderr`,
          `colorDepth`,
        ]) as Context,
      )
    } catch (error) {
      if (error.isBudError) throw error
      throw BudError.normalize(error)
    }

    this.bud.hooks.action(`build.before`, async bud => {
      await this.applyBudEnv(bud)
      await bud.api.processQueue()
    })

    await Promise.all([
      this.applyBudEnv(this.bud),
      this.applyBudManifestOptions(this.bud),
      this.applyBudArguments(this.bud),
    ])

    await this.bud.processConfigs()

    await this.applyBudArguments(this.bud)

    return this.bud
  }

  public async renderStatic(...children: Array<React.ReactElement>) {
    return render(
      <Static items={children}>
        {(child, id) => <Box key={id}>{child}</Box>}
      </Static>,
    ).unmount()
  }
}
