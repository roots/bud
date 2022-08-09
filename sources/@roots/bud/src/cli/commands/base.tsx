import type * as Config from '@roots/bud-framework/config'
import {BaseContext, Command} from 'clipanion'
import {bind} from 'helpful-decorators'
import {Box, render, Text} from 'ink'
import React from 'react'

import type Bud from '../../bud.js'
import {Notifier} from '../../notifier/index.js'
import * as disk from '../config/disk.config.js'

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

  public abstract runCommand(): Promise<unknown>

  /**
   * Node notifier
   *
   * @public
   */
  public notifier: Notifier

  public render = render

  /**
   * Execute command
   *
   * @public
   */
  public async execute() {
    this.render(
      <Box marginBottom={1} justifyContent="flex-start">
        <Text>
          <Text dimColor>$ bud</Text> <Text>{this.path.join(' ')} </Text>
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

    this.app.hooks.action('compiler.after', async () => {
      this.app.compiler.compilation.hooks.done.tap(
        'bud-cli-notifier',
        this.notifier.notify,
      )
    })

    try {
      await disk.config(this.app)
    } catch (error) {
      this.app.error(error)
    }

    return this.app
  }

  /**
   * Run the build
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run() {
    await this.app.run()
  }
}
