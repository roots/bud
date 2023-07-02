import type {Context} from '@roots/bud-framework/context'
import type {BaseContext} from '@roots/bud-support/clipanion'
import type browser from '@roots/bud/cli/flags/browser'

import {Bud} from '@roots/bud-framework'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, BudHandler} from '@roots/bud-support/errors'
import {Box, render, Static} from '@roots/bud-support/ink'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
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
import storage from '@roots/bud/cli/flags/storage'
import verbose from '@roots/bud/cli/flags/verbose'
import * as instance from '@roots/bud/instance'
import {env, exit} from 'node:process'

import type {CLIContext} from '../index.js'

import * as Fallback from '../components/Error.js'
import {Menu} from '../components/Menu.js'

export type {BaseContext, Context}
export {Option}

/**
 * {@link Command}
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

  public declare browser?: typeof browser

  public declare bud?: Bud | undefined

  public color: typeof color = color

  public declare context: CLIContext

  public debug: typeof debug = debug

  public dry = dry(true)

  public filter: typeof filter = filter

  public log = log

  public mode = mode

  public notify = notify

  public silent = silent(true)

  public storage = storage

  public verbose: typeof verbose = false

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
   * Binary (node, ts-node, bun)
   *
   * @remarks
   * String like `node`, `ts-node`, or `bun`. For executing child
   * processes with the same binary as the parent.
   */
  public get bin() {
    // eslint-disable-next-line n/no-process-env
    return env.BUD_JS_BIN
  }

  /**
   * Handle errors
   */
  public override async catch(error: BudHandler): Promise<void> {
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
      this.bud.dashboard.render({error})

      if (this.bud.isProduction) {
        const unmountDashboard = async () =>
          await this.bud.dashboard.instance.waitUntilExit()

        this.bud.compiler?.instance?.close
          ? this.bud.compiler.instance.close(unmountDashboard)
          : await unmountDashboard()
      }
    } else {
      await this.renderStatic(
        <Box flexDirection="column">
          <Fallback.Error error={error} />
        </Box>,
      ).catch(error => {
        logger.warn(error.message ?? error)
      })
    }

    // fallthrough
    // eslint-disable-next-line n/no-process-exit
    if (this.bud.isProduction) exit(1)
  }

  /**
   * {@link Command.execute}
   */
  public async execute() {
    render(<Menu cli={this.cli} />)
  }

  public async makeBud() {
    this.context.mode = this.mode ?? `production`

    if (isUndefined(this.dry)) this.context.dry = true
    if (isUndefined(this.silent)) this.context.silent = true

    await import(`../env.${this.context.mode}.js`).catch(this.catch)

    this.bud = instance.get()

    logger.info(`bud.js configured with`, omit(this.context, `env`))

    await this.bud.lifecycle(this.context).catch(this.catch)
    await this.bud.processConfigs().catch(this.catch)

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
