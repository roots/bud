import type { Bud } from '@roots/bud'
import type {
  CommandContext,
} from '@roots/bud-framework/options/context'
import {Command} from '@roots/bud-support/clipanion'
import Ink, {React, Renderer} from '@roots/bud-support/ink'
import isString from '@roots/bud-support/lodash/isString'

import * as Display from '../components/Error.js'
import {WinError} from '../components/WinError.js'
import {isWindows} from '../helpers/isWindows.js'

/**
 * Base command
 */
export default abstract class BaseCommand extends Command<CommandContext> {
  /**
   * {@link Bud}
   */
  public declare bud?: (Bud & {context: CommandContext}) | undefined

  /**
   * {@link Command.context}
   */
  public declare context: CommandContext

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
    bud: BaseCommand[`bud`],
  ) => Promise<BaseCommand[`bud`]>

  /**
   * CLI renderer
   */
  public declare renderer: Renderer

  /**
   * Binary (node, ts-node, bun)
   */
  public get bin() {
    // eslint-disable-next-line n/no-process-env
    return this.context.env.BUD_JS_BIN
  }

  /**
   * Render to stdout
   */
  public async render(children: React.ReactElement) {
    await this.renderer?.render(children)
  }

  /**
   * Render single frame to stdout
   */
  public async renderOnce(children: React.ReactElement) {
    await this.renderer?.once(children)
  }

  /**
   * Render plain text to stdout
   */
  public async text(text: string) {
    await this.renderer?.text(text)
  }

  /**
   * Initialize
   */
  public constructor() {
    super()
    this.renderer = new Renderer(process.stdout)
  }

  /**
   * Execute shell command
   */
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
