import {checkDependencies} from '@roots/bud/cli/helpers/checkDependencies'
import {
  checkNoPackageManager,
  checkPackageManagerConflict,
} from '@roots/bud/cli/helpers/checkPackageManagerErrors'
import {isInternalDevelopmentEnv} from '@roots/bud/cli/helpers/isInternalDevelopmentEnv'
import {Renderer} from '@roots/bud-dashboard/renderer'
import type * as Options from '@roots/bud-framework/options'
import type {Context} from '@roots/bud-framework/options/context'
import {BaseContext, Command, Option} from '@roots/bud-support/clipanion'
import {bind, once} from '@roots/bud-support/decorators'
import React from '@roots/bud-support/react'
import Signale from '@roots/bud-support/signale'
import * as t from '@roots/bud-support/typanion'

import type {Bud} from '../../bud/bud.js'
import {factory} from '../../factory/index.js'
import {Notifier} from '../../notifier/index.js'

/**
 * Base command
 *
 * @public
 */
export default abstract class BaseCommand extends Command {
  /**
   * Command usage
   *
   * @public
   */
  public static override usage = Command.Usage({
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
   * Context
   * @public
   */
  public override context: Options.Context & BaseContext

  public notify?: boolean

  /**
   * Run command
   * @virtual
   * @public
   */
  public runCommand?(): Promise<unknown>

  /**
   * basedir
   * @public
   */
  public basedir = Option.String(`--basedir,--cwd`, undefined, {
    description: `project base directory`,
    hidden: true,
  })

  /**
   *  dry
   * @public
   */
  public dry = Option.Boolean(`--dry`, false, {
    description: `Run without webpack or server process`,
    hidden: true,
  })

  /**
   * level
   */
  public level = Option.Counter(`--verbose,-v`, undefined, {
    description: `Set logging level`,
    hidden: true,
  })

  /**
   * log
   */
  public log = Option.Boolean(`--log`, undefined, {
    description: `Enable logging`,
    hidden: true,
  })

  /**
   * mode
   * @public
   */
  public mode = Option.String(`--mode`, undefined, {
    description: `Compilation mode`,
    validator: t.isOneOf([
      t.isLiteral(`production`),
      t.isLiteral(`development`),
    ]),
    hidden: true,
  })

  /**
   * label
   * @public
   */
  public filter = Option.Array(`--filter`, undefined, {
    description: `Limit compilation to particular compilers`,
    hidden: true,
  })

  /**
   * Application logger
   *
   * @public
   */
  public get logger() {
    return new Signale()
  }

  /**
   * Render ink component
   *
   * @param box - Ink box
   * @returns
   */
  @bind
  public async renderOnce(children: React.ReactElement) {
    await Renderer.once(children)
  }

  /**
   * Render ink component
   *
   * @param box - Ink box
   * @returns
   */
  @bind
  public async render(children: React.ReactElement) {
    await Renderer.render(children)
  }

  /**
   * Render ink component
   *
   * @param box - Ink box
   * @returns
   */
  @bind
  public async text(text: string) {
    await Renderer.text(text)
  }

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
      target: this.filter,
    }
  }

  /**
   * Subcommand args
   *
   * @virtual
   */
  public get args(): Partial<Context[`args`]> {
    return {}
  }

  /**
   * Execute command
   *
   * @public
   */
  @bind
  @once
  public async execute() {
    if (this.baseArgs.mode) {
      this.context.mode = this.baseArgs.mode
    }

    this.context.args = {
      ...this.context.args,
      ...this.baseArgs,
      ...this.args,
    }

    try {
      this.app = await factory(this.context)

      if (!isInternalDevelopmentEnv(this.app)) {
        checkNoPackageManager(this.app)
        checkPackageManagerConflict(this.app)
        await checkDependencies(this.app)
      }
    } catch (error) {
      return this.handleError(error)
    }

    try {
      if (this.runCommand) await this.runCommand()
    } catch (error) {
      return this.handleError(error)
    }

    try {
      if (this.context.args.notify !== false)
        this.app.hooks.action(`compiler.after`, async () => {
          this.app.compiler.instance.hooks.done.tap(
            `bud-cli-notifier`,
            new Notifier(this.app).notify,
          )
        })
    } catch (error) {
      return this.handleError(error)
    }
  }

  /**
   * Handle logging error
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public handleError(error: any) {
    this.context.stderr.write(
      `\n`.concat(
        typeof error === `string`
          ? error
          : error?.message ?? JSON.stringify(error),
      ),
    )

    return 1
  }
}
