import type * as Config from '@roots/bud-framework/config'
import {BaseContext, Command, Option} from 'clipanion'
import {bind} from 'helpful-decorators'
import {Box, render, Text} from 'ink'
import React from 'react'

import type Bud from '../../bud.js'
import {Notifier} from '../../notifier/index.js'

/**
 * Base command
 *
 * @public
 */
export abstract class BaseCommand extends Command {
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
   * Application logger
   *
   * @public
   */
  public get logger() {
    return this.app.logger.instance
  }

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

  public abstract runCommand(): Promise<unknown>

  /**
   * Node notifier
   *
   * @public
   */
  public notifier: Notifier

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
    this.renderOnce(
      <Box marginY={1} justifyContent="flex-start">
        <Text>
          <Text dimColor>$ bud</Text> <Text>{this.path.join(` `)} </Text>
        </Text>
      </Box>,
    )

    await this.runCommand()
  }

  /**
   * Bootstrap Application
   *
   * @returns Bud
   */
  @bind
  public async make() {
    this.notifier = new Notifier(this.app)

    this.app.hooks.action(`compiler.after`, async () => {
      this.app.compiler.instance.hooks.done.tap(
        `bud-cli-notifier`,
        this.notifier.notify,
      )
    })

    return this.app
  }
}
