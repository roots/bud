import type * as Config from '@roots/bud-framework/config'
import {BaseContext, Command, Option} from 'clipanion'
import {bind} from 'helpful-decorators'
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
export abstract class BaseCommand extends Command {
  public abstract runCommand(): Promise<unknown>

  /**
   * Context
   *
   * @public
   */
  public context: Config.Context & BaseContext

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
  public get args(): Config.Context[`args`] {
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
  })

  /**
   * -- dry
   */
  public dry = Option.Boolean(`--dry`, false, {
    description: `Run without webpack or server process`,
  })

  /**
   * --level
   */
  public level = Option.Array<Boolean>(`-v`, undefined, {
    description: `Set logging level`,
  })

  /**
   * --log
   */
  public log = Option.Boolean(`--log`, undefined, {
    description: `Enable logging`,
  })

  /**
   * --target
   */
  public target = Option.Array(`--target,-t`, undefined, {
    description: `Limit compilation to particular compilers`,
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

  public get baseArgs() {
    return {
      basedir: this.basedir,
      dry: this.dry,
      level: this.level,
      log: this.log,
      mode: this.mode,
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
  public async execute() {
    this.context = {
      ...this.context,
      basedir: this.context.basedir,
      mode: this.args.mode ?? this.context.mode,
      args: {
        ...this.context.args,
        ...this.baseArgs,
        ...(this.args ?? {}),
      },
    }

    this.renderOnce(
      <Box marginY={1} justifyContent="flex-start">
        <Text>
          <Text dimColor>$ bud</Text>
          {` `}
          <Text>{process.argv.splice(2).join(` `)} </Text>
        </Text>
      </Box>,
    )

    this.app = await factory(this.context)

    if (this.runCommand) await this.runCommand()

    this.notifier = new Notifier(this.app)

    this.app.hooks.action(`compiler.after`, async () => {
      this.app.compiler.instance.hooks.done.tap(
        `bud-cli-notifier`,
        this.notifier.notify,
      )
    })
  }

  /**
   * Bootstrap Application
   *
   * @returns Bud
   */
  @bind
  public async make() {
    return this.app
  }
}
