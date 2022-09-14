import type * as Options from '@roots/bud-framework/options'
import {BaseContext, Command, Option} from '@roots/bud-support/clipanion'
import {bind, once} from '@roots/bud-support/decorators'
import {Box, render} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import * as t from 'typanion'

import type Bud from '../../bud.js'
import {factory} from '../../factory/index.js'
import {Notifier} from '../../notifier/index.js'

/**
 * Base command
 *
 * @public
 */
export default class BaseCommand extends Command {
  /**
   * Command usage
   * @public
   */
  public static usage = Command.Usage({
    description: `Run \`bud --help\` for usage information`,
    details: `\
      \`bud build production\` compiles source assets in \`production\` mode. Run \`bud build production --help\` for usage.

      \`bud build development\` compiles source assets in \`development\` mode and serves updated modules. Run \`bud build development --help\` for usage.
    `,
    examples: [[`compile source assets`, `$0 build`]],
  })

  /**
   * Application
   * @public
   */
  public app: Bud

  /**
   * React (lazy loaded)
   * @public
   */
  public React: any

  /**
   * Ink (lazy loaded)
   * @public
   */
  public Ink: any

  /**
   * Context
   * @public
   */
  public context: Options.Context & BaseContext

  /**
   * Node notifier
   * @public
   */
  public notifier: Notifier

  /**
   * Run command
   * @virtual
   * @public
   */
  public runCommand?(): Promise<unknown>

  /**
   * --basedir
   * @public
   */
  public basedir = Option.String(`--basedir,--cwd`, undefined, {
    description: `project base directory`,
    env: `APP_BASE_DIR`,
    hidden: true,
  })

  /**
   * -- dry
   * @public
   */
  public dry = Option.Boolean(`--dry`, false, {
    description: `Run without webpack or server process`,
    hidden: true,
  })

  /**
   * --inject
   * @public
   */
  public discovery = Option.Boolean(`--discovery`, true, {
    description: `Automatically search for and register extensions`,
    hidden: true,
  })

  /**
   * --level
   */
  public level = Option.Array<Boolean>(`-v`, undefined, {
    description: `Set logging level`,
    hidden: true,
  })

  /**
   * --log
   */
  public log = Option.Boolean(`--log`, undefined, {
    description: `Enable logging`,
    hidden: true,
  })

  /**
   * --mode
   * @public
   */
  public mode = Option.String(`--mode`, undefined, {
    description: `Compilation mode`,
    validator: t.isOneOf([
      t.isLiteral(`production`),
      t.isLiteral(`development`),
    ]),
    env: `APP_MODE`,
    hidden: true,
  })

  /**
   * --notify
   * @public
   */
  public notify = Option.Boolean(`--notify`, true, {
    description: `Enable notfication center messages`,
  })

  /**
   * --target
   */
  public target = Option.Array(`--target,-t`, undefined, {
    description: `Limit compilation to particular compilers`,
    hidden: true,
  })

  /**
   * Base arguments
   * @public
   */
  public get baseArgs() {
    return {
      basedir: this.basedir,
      dry: this.dry,
      level: this.level,
      log: this.log,
      mode: this.mode,
      notify: this.notify,
      target: this.target,
    }
  }

  /**
   * @virtual
   * @public
   */
  public get args(): Options.Context[`args`] {
    return {}
  }

  /**
   * Application logger
   *
   * @public
   */
  public get logger() {
    return this.app.logger.instance
  }

  @bind
  public async renderOnce(children: React.ReactElement) {
    this.log !== false && render(<Box>{children}</Box>).unmount()
  }

  /**
   * Render ink component
   *
   * @param box - Ink box
   * @returns
   */
  @bind
  public async render(box: React.ReactElement) {
    return this.log !== false && render(box)
  }

  /**
   * Execute command
   *
   * @public
   */
  @bind
  @once
  public async execute() {
    this.context = {
      ...this.context,
      mode: this.args?.mode ?? this.baseArgs.mode ?? this.context.mode,
      args: {
        ...this.context.args,
        ...this.baseArgs,
        ...(this.args ?? {}),
      },
    }

    this.app = await factory(this.context)

    if (this.runCommand) await this.runCommand()

    if (this.notify !== false)
      this.app.hooks.action(
        `compiler.close`,
        new Notifier(this.app).notify,
      )
  }
}
