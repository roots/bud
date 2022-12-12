import type * as Options from '@roots/bud-framework/options'
import type {Context} from '@roots/bud-framework/options/context'
import {BaseContext, Command, Option} from '@roots/bud-support/clipanion'
import {bind, once} from '@roots/bud-support/decorators'
import React from '@roots/bud-support/react'
import Signale from '@roots/bud-support/signale'
import * as t from '@roots/bud-support/typanion'

import type Bud from '../../bud/index.js'
import {factory} from '../../factory/index.js'
import Notifier from '../../notifier/index.js'
import {checkDependencies} from '../helpers/checkDependencies.js'
import {checkLockfile} from '../helpers/checkLockfile.js'
import {checkPackageManagerConflict} from '../helpers/checkPackageManagerConflict.js'
import Render from '../helpers/render.js'

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

  /**
   * Node notifier
   * @public
   */
  public notifier: Notifier

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
    return Render.once(children)
  }

  /**
   * Render ink component
   *
   * @param box - Ink box
   * @returns
   */
  @bind
  public async render(children: React.ReactElement) {
    return Render.view(children)
  }

  /**
   * Render ink component
   *
   * @param box - Ink box
   * @returns
   */
  @bind
  public async text(text: string) {
    return Render.text(text)
  }

  /**
   * Base arguments
   * @public
   */
  public get commandArgs() {
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
    this.context.mode = this.commandArgs.mode ?? `production`
    this.context.args = {
      ...this.context.args,
      ...this.commandArgs,
      ...this.args,
    }

    try {
      this.app = await factory(this.context)
      if (this.context.bud.version !== `0.0.0`) {
        await checkDependencies(this.app)
        checkPackageManagerConflict(this.app)
        checkLockfile(this.app)
      }
    } catch (error) {
      this.handleError(error)
      return 1
    }

    try {
      if (this.runCommand) await this.runCommand()
    } catch (error) {
      this.handleError(error)
      return 1
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
      this.handleError(error)
      return 1
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
  }
}
