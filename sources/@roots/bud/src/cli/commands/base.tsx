import type * as Options from '@roots/bud-framework/options'
import {BaseContext, Command, Option} from 'clipanion'
import {bind, once} from 'helpful-decorators'
import {Box, render, Text} from 'ink'
import React from 'react'
import * as t from 'typanion'

import type Bud from '../../bud.js'
import {factory} from '../../factory/index.js'
import {Notifier} from '../../notifier/index.js'

/**
 * Base command
 *
 * @public
 */
export default abstract class BaseCommand extends Command {
  public abstract runCommand(): Promise<unknown>

  /**
   * Context
   *
   * @public
   */
  public context: Options.Context & BaseContext

  /**
   * Application
   *
   * @public
   */
  public app: Bud

  /**
   * Node notifier
   *
   * @public
   */
  public notifier: Notifier

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

  /**
   * Base directory
   * @public
   */
  public basedir = Option.String(`--basedir,--cwd`, undefined, {
    description: `project base directory`,
    env: `APP_BASE_DIR`,
    hidden: true,
  })

  /**
   * -- dry
   */
  public dry = Option.Boolean(`--dry`, false, {
    description: `Run without webpack or server process`,
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
   * Render ink component and immediately unmount
   *
   * @param box - Ink box
   * @returns
   */
  @bind
  public renderOnce(box: React.ReactElement) {
    return this.log !== false && this.render(box).unmount()
  }

  /**
   * Render ink component
   *
   * @param box - Ink box
   * @returns
   */
  @bind
  public render(box: React.ReactElement) {
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
      basedir:
        this.args?.basedir ??
        this.baseArgs.basedir ??
        this.context.basedir,
      mode: this.args?.mode ?? this.baseArgs.mode ?? this.context.mode,
      args: {
        ...this.context.args,
        ...this.baseArgs,
        ...(this.args ?? {}),
      },
    }

    this.renderOnce(
      <Box marginY={1} justifyContent="flex-start">
        <Text dimColor>$ bud {process.argv.splice(2).join(` `)} </Text>
      </Box>,
    )

    this.app = await factory(this.context)

    if (this.runCommand) await this.runCommand()

    this.app.hooks.action(`compiler.close`, new Notifier(this.app).notify)
  }
}
