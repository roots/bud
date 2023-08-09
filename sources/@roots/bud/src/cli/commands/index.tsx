import type {Context} from '@roots/bud-framework/context'
import type {BaseContext} from '@roots/bud-support/clipanion'
import type {ExecaReturnValue} from '@roots/bud-support/execa'
import type browser from '@roots/bud/cli/flags/browser'

import {join, parse} from 'node:path'
import {env, exit} from 'node:process'

import {Bud} from '@roots/bud-framework'
import chalk from '@roots/bud-support/chalk'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, render, Static} from '@roots/bud-support/ink'
import isNumber from '@roots/bud-support/lodash/isNumber'
import logger from '@roots/bud-support/logger'
import args from '@roots/bud-support/utilities/args'
import basedir from '@roots/bud/cli/flags/basedir'
import color from '@roots/bud/cli/flags/color'
import debug from '@roots/bud/cli/flags/debug'
import dry from '@roots/bud/cli/flags/dry'
import filter from '@roots/bud/cli/flags/filter'
import log from '@roots/bud/cli/flags/log'
import mode from '@roots/bud/cli/flags/mode'
import notify from '@roots/bud/cli/flags/notify'
import silent from '@roots/bud/cli/flags/silent'
import storage from '@roots/bud/cli/flags/storage'
import verbose from '@roots/bud/cli/flags/verbose'
import {isset} from '@roots/bud/cli/helpers/isset'
import * as instance from '@roots/bud/instance'

import * as Fallback from '../components/Error.js'
import {Menu} from '../components/Menu.js'

export type {BaseContext, Context}
export {Option}

/**
 * {@link Command}
 */
export default class BudCommand extends Command<BaseContext & Context> {
  /**
   * {@link Command.paths}
   */
  public static override paths: Array<Array<string>> = [Command.Default]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    category: `build`,
    description: `Configurable, extensible build tools for modern single and multi-page web applications`,
    details: `\
      Documentation for this command is available at https://bud.js.org/.

      Any flags which accept a boolean can be negated with the \`--no-\` prefix. For example, \`--no-color\` will disable color output.

      Any command can be exited with \`esc\` or \`ctrl+c\`.

      Common tasks:

        - \`bud build production\` compiles source assets in \`production\` mode.
        - \`bud build development\` compiles source assets in \`development\` mode and updates modules in the browser.
        - \`bud doctor\` checks your system and project for common configuration issues. Try this before making an issue in the bud.js repo.
        - \`bud upgrade\` upgrades bud.js core packages and extensions to the latest version.

      Helpful flags:

        - \`--help\` can be appened to any command for usage information.
        - \`--basedir\` sets the working directory for bud and will be treated as project root.
        - \`--storage\` sets the storage directory. Defaults to the system tmp dir.
        - \`--log\` enables logging. Use \`--log\` in tandem with \`--verbose\` for more detailed output.
        - \`--debug\` enables debug mode. It is very noisy in the terminal but also produces useful output files in the storage directory.
    `,
    examples: [[`Interactive menu of available subcommands`, `$0`]],
  })

  public basedir = basedir

  public declare browser?: typeof browser

  public declare bud?: Bud | undefined

  public color: typeof color = color

  public debug: typeof debug = debug

  public dry = dry(true)

  public filter: typeof filter = filter

  public log = log

  public mode = mode

  public declare notify: typeof notify

  public silent = silent(true)

  public storage = storage

  public verbose: typeof verbose = false

  /**
   * Render static
   */
  public static renderStatic(...children: Array<React.ReactElement>) {
    return render(
      <Static items={children}>
        {(child, id) => <Box key={id}>{child}</Box>}
      </Static>,
    ).unmount()
  }

  /**
   * Execute arbitrary sh command with inherited stdio
   */
  @bind
  public async $(
    bin: string,
    args: Array<string>,
    options = {},
  ): Promise<ExecaReturnValue<string>> {
    const bail = () => setTimeout(exit, 100)

    const {execa} = await import(`@roots/bud-support/execa`)
    const process = execa(bin, args.filter(Boolean), {
      cwd: this.bud.path(),
      encoding: `utf8`,
      env: {NODE_ENV: `development`},
      stdio: `inherit`,
      ...options,
    })
      .on(`data`, data => data && this.context.stdout.write(data))
      .on(
        `error`,
        error => error && this.context.stderr.write(error.message),
      )
      .on(`exit`, bail)
      .on(`disconnect`, bail)
      .on(`close`, bail)

    const result = await process
    return result
  }

  /**
   * Apply context from argv to bud.js instance
   */
  @bind
  public async applyBudArguments(bud: BudCommand[`bud`]) {
    /**
     * Override settings:
     *
     * - when children: all children but not the parent
     * - when no children: the parent;
     */
    const override = async (fn: (bud: Bud) => Promise<any>) => {
      bud.hasChildren
        ? await Promise.all(
            [bud, ...Object.values(bud.children)].map(
              async bud => await fn(bud),
            ),
          )
        : await fn(bud)
    }

    isset(args.input) && bud.setPath(`@src`, args.input)
    isset(args.output) && bud.setPath(`@dist`, args.output)
    isset(args.publicPath) && bud.setPublicPath(args.publicPath)
    isset(args.modules) && bud.setPath(`@modules`, args.modules)

    isset(args.hot) &&
      bud.hooks.on(`dev.middleware.enabled`, (middleware = []) =>
        middleware.filter(key =>
          args.hot === false ? key !== `hot` : args.hot,
        ),
      )

    isset(args.proxy) &&
      bud.hooks.on(
        `dev.middleware.proxy.options.target`,
        new URL(args.proxy),
      )

    isset(args.cache) &&
      (await override(async bud => bud.persist(args.cache)))

    isset(args.minimize) &&
      (await override(async bud => bud.minimize(args.minimize)))

    isset(args.devtool) &&
      (await override(async bud => bud.devtool(args.devtool)))

    isset(args.esm) &&
      (await override(async bud => bud.esm.enable(args.esm)))

    isset(args.html) &&
      (await override(async bud => {
        typeof args.html === `string`
          ? bud.html({template: args.html})
          : bud.html(args.html)
      }))

    isset(args.immutable) &&
      (await override(async bud => bud.cdn.freeze(args.immutable)))

    if (isset(args.hash)) {
      await override(async bud => {
        bud.context.hash = args.hash
        logger.log(`hash set from --hash flag`, `value:`, args.hash)
      })
    }

    isset(args.runtime) &&
      (await override(async bud => bud.runtime(args.runtime)))

    isset(args.splitChunks) &&
      (await override(async bud => bud.splitChunks(args.splitChunks)))

    isset(args.use) && (await bud.extensions.add(args.use as any))

    await override(async bud => await bud.promise())
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
      .when(isset(manifest.paths?.input), bud =>
        bud.hooks.on(`location.@src`, manifest.bud.paths.input),
      )
      .when(isset(manifest.paths?.output), bud =>
        bud.hooks.on(`location.@dist`, manifest.bud.paths.output),
      )
      .when(isset(manifest.paths?.storage), bud =>
        bud.hooks.on(`location.@storage`, manifest.bud.paths.storage),
      )
  }

  /**
   * Binary
   *
   * @remarks
   * String like `node`, `ts-node`, or `bun`. For executing child
   * processes with the same binary as the parent.
   */
  public get bin() {
    return env.BUD_JS_BIN
  }

  /**
   * Handle errors
   */
  @bind
  public override async catch(error: BudError): Promise<void> {
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

    if (this.bud?.dashboard?.instance) {
      this.bud.dashboard.render(error)

      if (this.bud.isProduction) {
        const unmountDashboard = async () =>
          await this.bud.dashboard.instance.waitUntilExit()

        this.bud.compiler?.instance?.close
          ? this.bud.compiler.instance.close(unmountDashboard)
          : await unmountDashboard()
      }
    } else {
      BudCommand.renderStatic(
        <Box flexDirection="column">
          <Fallback.Error error={error} />
        </Box>,
      )
    }

    // fallthrough
    if (!this.bud || this.bud?.isProduction) exit(1)
  }

  /**
   * {@link Command.execute}
   */
  public async execute(): Promise<number | void> {
    render(<Menu cli={this.cli} />)
  }

  /**
   * Make {@link Bud} instance
   */
  @bind
  public async makeBud() {
    const applyCliOptionsCallback = async (bud: Bud) => {
      await Promise.all([
        this.applyBudEnv(bud),
        this.applyBudManifestOptions(bud),
        this.applyBudArguments(bud),
      ]).catch(this.catch)

      await bud.promise().catch(this.catch)
    }

    this.context.dry = this.dry
    this.context.mode = this.mode ?? this.context.mode ?? `production`
    this.context.silent = this.silent

    await import(`../env.${this.context.mode}.js`).catch(this.catch)

    this.bud = instance.get()

    await this.bud.initialize(this.context).catch(this.catch)
    await applyCliOptionsCallback(this.bud).catch(this.catch)

    await this.bud.processConfigs().catch(this.catch)

    await applyCliOptionsCallback(this.bud).catch(this.catch)
    this.bud.hooks.action(`build.before`, applyCliOptionsCallback)

    return this.bud
  }

  /**
   * Run a binary.
   */
  @bind
  public async run(
    path: Array<string>,
    userArgs: Array<string>,
    defaultArgs: Array<string> = [],
  ) {
    let [signifier, ...pathParts] = path

    const binaryPath = await this.bud.module
      .getDirectory(signifier)
      .catch(this.catch)

    if (typeof binaryPath !== `string`) {
      process.exitCode = 3
      throw new Error(`Could not find ${signifier} module`)
    }

    let binary = join(binaryPath, ...pathParts)

    if (!(await this.bud.fs.exists(binary))) {
      const checkedPaths = []
      const parsedParts = parse(join(...pathParts))
      const extensions = [`.js`, `.mjs`, `.cjs`].filter(
        ext => ext !== parsedParts.ext,
      )

      pathParts = await extensions.reduce(async (promise, ext) => {
        const result = await promise
        if (result) return result
        const path = [parsedParts.dir, `${parsedParts.name}${ext}`]
        checkedPaths.push(join(...path))
        if (await this.bud.fs.exists(join(binaryPath, ...path)))
          return path
      }, Promise.resolve(null))

      if (!pathParts) {
        process.exitCode = 2
        throw new Error(
          `Could not find ${signifier} binary\n\nChecked:\n - ${binary}\n - ${checkedPaths
            .map(path => join(binaryPath, path))
            .join(`\n - `)}`,
        )
      }

      binary = join(binaryPath, ...pathParts)
    }

    const binaryArguments = userArgs?.length ? userArgs : defaultArgs

    this.context.stdout.write(
      chalk.dim(
        `${figures.pointerSmall} ${signifier} ${binaryArguments.join(
          ` `,
        )}\n`
          .replace(this.bud.path(`@src`), `@src`)
          .replace(this.bud.path(), ``),
      ),
    )

    const result = await this.$(binary, binaryArguments).catch(() => {})
    const code = result && isNumber(result?.exitCode) ? result.exitCode : 1

    if (code) {
      this.context.stderr.write(
        chalk.red(`${figures.cross} exiting with code ${code}\n`),
      )
      return code
    }

    this.context.stdout.write(chalk.green(`${figures.tick} success\n`))
    return code
  }
}
