import type {Context} from '@roots/bud-framework/context'
import type {BaseContext} from '@roots/bud-support/clipanion'
import type {ExecaReturnValue} from '@roots/bud-support/execa'

import {join, parse} from 'node:path'
import {exit} from 'node:process'

import basedir from '@roots/bud/cli/flags/basedir'
import cache from '@roots/bud/cli/flags/cache'
import clean from '@roots/bud/cli/flags/clean'
import color from '@roots/bud/cli/flags/color'
import debug from '@roots/bud/cli/flags/debug'
import dry from '@roots/bud/cli/flags/dry'
import filter from '@roots/bud/cli/flags/filter'
import force from '@roots/bud/cli/flags/force'
import ignoreErrors from '@roots/bud/cli/flags/ignoreErrors'
import input from '@roots/bud/cli/flags/input'
import log from '@roots/bud/cli/flags/log'
import mode from '@roots/bud/cli/flags/mode'
import notify from '@roots/bud/cli/flags/notify'
import output from '@roots/bud/cli/flags/output'
import publicPath from '@roots/bud/cli/flags/publicPath'
import silent from '@roots/bud/cli/flags/silent'
import storage from '@roots/bud/cli/flags/storage'
import use from '@roots/bud/cli/flags/use'
import verbose from '@roots/bud/cli/flags/verbose'
import override, {type Override} from '@roots/bud/cli/helpers/override'
import * as instance from '@roots/bud/instance'
import {Bud} from '@roots/bud-framework'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import {render as renderError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import * as Ink from '@roots/bud-support/ink'
import {render} from '@roots/bud-support/ink/instance'
import isNumber from '@roots/bud-support/isNumber'
import noop from '@roots/bud-support/noop'

/**
 * Base {@link Command}
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

  public declare bud?: Bud | undefined

  public cache = cache

  public clean = clean

  public color = color

  public debug = debug

  public dry = dry(true)

  public filter = filter

  public force = force

  public ignoreErrors = ignoreErrors

  public input = input

  public log = log

  public mode = mode

  public output = output

  public notify = notify

  public publicPath = publicPath

  public silent = silent(true)

  public storage = storage

  public use = use

  public verbose = verbose

  /**
   * Render static cli output
   */
  public renderStatic(el: React.ReactElement) {
    return render(
      <Ink.Static items={[0]}>
        {(e, i) => <Ink.Fragment key={i}>{el}</Ink.Fragment>}
      </Ink.Static>,
    )
  }

  /**
   * Execute arbitrary sh command with inherited stdio
   */
  @bind
  public async $(
    bin: string,
    args: Array<string>,
    options = {},
    bail: () => any = () => setTimeout(exit, 100),
  ): Promise<ExecaReturnValue<string>> {
    const {execa} = await import(`@roots/bud-support/execa`)

    const cwd = this.bud?.path() ?? process.cwd()

    return execa(bin, args.filter(Boolean), {
      cwd,
      encoding: `utf8`,
      env: {NODE_ENV: `development`},
      extendEnv: true,
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
  }

  @bind
  public async override([argValue, envKey, manifestPath, callback]: [
    argValue: any,
    envKey: string,
    manifestPath: string,
    callback: (bud: Bud) => (value: any) => Promise<any>,
  ]) {
    await override(this.bud, argValue, envKey, manifestPath, callback)
  }

  /**
   * Apply context from manifest to bud.js instance
   */
  @bind
  public async applyUserOptions(bud: Bud) {
    await Promise.all(
      [
        [
          this.cache,
          `BUD_CACHE`,
          `cache`,
          b => async v => b.persist(v),
        ] satisfies Override<`filesystem` | `memory` | boolean>,
        [
          this.input,
          `BUD_PATH_INPUT`,
          `paths.input`,
          b => async v => b.setPath(`@src`, v),
        ] satisfies Override<string>,
        [
          this.output,
          `BUD_PATH_OUTPUT`,
          `paths.output`,
          b => async v => b.setPath(`@dist`, v),
        ] satisfies Override<string>,
        [
          this.publicPath,
          `BUD_PATH_PUBLIC`,
          `paths.public`,
          b => async v => b.setPublicPath(v),
        ] satisfies Override<string>,
        [
          this.storage,
          `BUD_PATH_STORAGE`,
          `paths.storage`,
          b => async v => b.hooks.on(`location.@storage`, b.relPath(v)),
        ] satisfies Override<string>,
        [
          this.use,
          `BUD_USE`,
          undefined,
          b => async v =>
            await b.extensions.add(
              v.reduce((a, v) => [...a, ...v.split(`,`)], []),
            ),
        ] satisfies Override<Array<string>>,
      ].map(this.override),
    )
  }

  /**
   * Handle errors
   */
  @bind
  public override async catch(error: BudError): Promise<void> {
    if (!error.isBudError) error = BudError.normalize(error)

    if (this.bud?.notifier?.notify) {
      this.bud.notifier.notify({
        group: this.bud.label,
        message: error?.message,
        subtitle: error?.name ?? `Error`,
        title: this.bud.label ?? `bud.js`,
      })
    }

    renderError(error)

    if ((!this.bud || this.bud.isProduction) && this.ignoreErrors !== true)
      exit(1)
  }

  /**
   * {@link Command.execute}
   */
  public async execute(): Promise<number | void> {
    const {Menu} = await import(`@roots/bud/cli/components/Menu`)
    render(<Menu cli={this.cli} />)
  }

  /**
   * Make {@link Bud} instance
   */
  @bind
  public async makeBud() {
    this.context = {
      ...this.context,
      dry: this.dry,
      ignoreErrors: this.ignoreErrors,
      mode: this.mode ?? this.context.mode ?? `production`,
      silent: this.silent,
    }

    this.bud = await instance.get().initialize(this.context)

    await this.applyUserOptions(this.bud)

    this.bud.hooks.action(`config.after`, this.applyUserOptions)

    return await this.bud.processConfigs()
  }

  /**
   * Run a binary.
   */
  @bind
  public async run(
    path: Array<string>,
    userArgs?: Array<string>,
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
          [
            `Could not find ${signifier} binary`,
            ``,
            `Checked:`,
            `- ${binary}`,
            ...checkedPaths
              .map(path => join(binaryPath, path))
              .map(path => `- ${path}`),
          ].join(`\n`),
        )
      }

      binary = join(binaryPath, ...pathParts)
    }

    const binaryArguments = userArgs?.length ? userArgs : defaultArgs

    this.context.stdout.write(
      `${figures.pointerSmall} ${signifier} ${binaryArguments.join(` `)}\n`
        .replace(this.bud.path(`@src`), `@src`)
        .replace(this.bud.path(), ``),
    )

    const result = await this.$(binary, binaryArguments).catch(noop)

    const exitCode =
      result && isNumber(result?.exitCode) ? result.exitCode : 1

    if (exitCode) {
      this.context.stderr.write(`${figures.cross} exit code ${exitCode}\n`)
      return exitCode
    }

    this.context.stdout.write(`${figures.tick} success\n`)

    return exitCode
  }
}

export type {BaseContext, Context}
export {Option}
