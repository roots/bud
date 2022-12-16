import {resolve} from 'node:path/win32'

import {Bud, factory} from '@roots/bud'
import {checkDependencies} from '@roots/bud/cli/helpers/checkDependencies'
import {
  checkNoPackageManager,
  checkPackageManagerConflict,
} from '@roots/bud/cli/helpers/checkPackageManagerErrors'
import {isInternalDevelopmentEnv} from '@roots/bud/cli/helpers/isInternalDevelopmentEnv'
import {isset} from '@roots/bud/cli/helpers/isset'
import {Renderer} from '@roots/bud-dashboard/renderer'
import type * as Options from '@roots/bud-framework/options'
import type {Context} from '@roots/bud-framework/options/context'
import {BaseContext, Command, Option} from '@roots/bud-support/clipanion'
import {bind, once} from '@roots/bud-support/decorators'
import {Box, Text} from '@roots/bud-support/ink'
import {isString} from '@roots/bud-support/lodash-es'
import React from '@roots/bud-support/react'
import Signale from '@roots/bud-support/signale'
import * as t from '@roots/bud-support/typanion'

import {Notifier} from '../../notifier/index.js'

/**
 * Bud command
 *
 * @public
 */
export default class BudCommand extends Command {
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
   * Context
   * @public
   */
  public override context: Options.Context & BaseContext

  public notify?: boolean

  public runCommand?(bud: Bud): Promise<unknown>

  public declare input?: string
  public declare output?: string
  public declare manifest?: boolean
  public declare publicPath?: string
  public declare storage?: string
  public declare cache?: boolean | `memory` | `filesystem`
  public declare minimize?: boolean
  public declare devtool?:
    | false
    | `eval`
    | `eval-cheap-source-map`
    | `eval-cheap-module-source-map`
    | `eval-source-map`
    | `cheap-source-map`
    | `cheap-module-source-map`
    | `source-map`
    | `inline-cheap-source-map`
    | `inline-cheap-module-source-map`
    | `inline-source-map`
    | `eval-nosources-cheap-source-map`
    | `eval-nosources-cheap-modules-source-map`
    | `eval-nosources-source-map`
    | `inline-nosources-cheap-source-map`
    | `inline-nosources-cheap-module-source-map`
    | `inline-nosources-source-map`
    | `nosources-cheap-source-map`
    | `nosources-cheap-module-source-map`
    | `hidden-nosources-cheap-source-map`
    | `hidden-nosources-cheap-module-source-map`
    | `hidden-nosources-source-map`
    | `hidden-cheap-source-map`
    | `hidden-cheap-module-source-map`
    | `hidden-source-map`
  public declare esm?: boolean
  public declare immutable?: boolean
  public declare clean?: boolean
  public declare hash?: boolean
  public declare runtime?: `single` | `multiple` | boolean
  public declare splitChunks?: boolean
  public declare html?: string | boolean

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
    this.context.mode = this.mode ?? this.context.mode ?? `production`

    this.context.args = {
      ...this.context.args,
      basedir: this.basedir
        ? resolve(this.context.basedir, this.basedir)
        : this.context.basedir,
      mode: this.context.mode,
      dry: this.dry,
      level: this.level,
      log: this.log,
      notify: this.notify,
      target: this.filter,
      ...(this.args ?? {}),
    }

    const bud = await factory(this.context, true, true)

    try {
      if (!isInternalDevelopmentEnv(bud)) {
        checkNoPackageManager(bud)
        checkPackageManagerConflict(bud)
        await checkDependencies(bud)
      }
    } catch (error) {
      throw error
    }

    try {
      if (this.runCommand) {
        await this.runCommand(bud)
      }
    } catch (error) {
      throw error
    }

    try {
      if (this.context.args.notify !== false)
        bud.hooks.action(`compiler.after`, async () => {
          bud.compiler.instance.hooks.done.tap(
            `bud-cli-notifier`,
            new Notifier(bud).notify,
          )
        })
    } catch (error) {
      throw error
    }
  }

  @bind
  public override async catch(error: string | {message: string}) {
    this.renderOnce(
      <Box>
        <Text backgroundColor="red" color="white">
          Error
        </Text>

        <Text>
          {typeof error === `string`
            ? error
            : isString(error?.message)
            ? error.message
            : JSON.stringify(error)}
        </Text>
      </Box>,
    )
    // eslint-disable-next-line
    process.exit(1)
  }

  /**
   * Apply context from .env
   *
   * @public
   */
  @bind
  public async applyEnv(bud: Bud) {
    if (bud.env.isString(`APP_MODE`)) {
      bud.hooks.on(
        `build.mode`,
        bud.env.get<`development` | `production`>(`APP_MODE`),
      )
      bud.success(
        `mode set to`,
        bud.env.get(`APP_MODE`),
        `from environment`,
      )
    }

    if (bud.env.isString(`APP_BASE_PATH`)) {
      bud.context.basedir = bud.env.get(`APP_BASE_PATH`)
      bud.success(
        `project base path set to`,
        bud.env.get(`APP_BASE_PATH`),
        `from environment`,
      )
    }

    if (bud.env.isString(`APP_PUBLIC_PATH`)) {
      bud.hooks.on(
        `build.output.publicPath`,
        bud.env.get(`APP_PUBLIC_PATH`),
      )
      bud.success(
        `public path set to`,
        bud.env.get(`APP_PUBLIC_PATH`),
        `from environment`,
      )
    }

    if (bud.env.isString(`APP_SRC_PATH`)) {
      bud.hooks.on(`location.@src`, bud.env.get(`APP_SRC_PATH`))
      bud.success(
        `src path set to`,
        bud.env.get(`APP_SRC_PATH`),
        `from environment`,
      )
    }

    if (bud.env.isString(`APP_DIST_PATH`)) {
      bud.hooks.on(`location.@dist`, bud.env.get(`APP_DIST_PATH`))

      bud.success(
        `dist path set to`,
        bud.env.get(`APP_DIST_PATH`),
        `from environment`,
      )
    }

    if (bud.env.isString(`APP_STORAGE_PATH`)) {
      bud.hooks.on(`location.@storage`, bud.env.get(`APP_STORAGE_PATH`))

      bud.success(
        `storage path set to`,
        bud.env.get(`APP_STORAGE_PATH`),
        `from environment`,
      )
    }
  }

  /**
   * Apply context from `package.json`
   *
   * @public
   */
  @bind
  public async applyManifestOptions(bud: Bud) {
    if (isset(bud.context.manifest?.bud?.[`publicPath`]))
      bud.hooks.on(
        `build.output.publicPath`,
        bud.context.manifest.bud[`publicPath`],
      )

    if (isset(bud.context.manifest?.bud?.paths?.[`src`]))
      bud.hooks.on(`location.@src`, bud.context.manifest.bud.paths[`src`])

    if (isset(bud.context.manifest?.bud?.paths?.[`dist`]))
      bud.hooks.on(
        `location.@dist`,
        bud.context.manifest.bud.paths[`dist`],
      )

    if (isset(bud.context.manifest?.bud?.paths?.[`storage`]))
      bud.hooks.on(
        `location.@storage`,
        bud.context.manifest.bud.paths[`storage`],
      )
  }

  /**
   * Apply context from argv
   *
   * @public
   */
  @bind
  public async applyArgs(bud: Bud) {
    if (isset(this.context.args.input)) bud.setPath(`@src`, this.input)
    if (isset(this.context.args.output)) bud.setPath(`@dist`, this.output)

    if (isset(this.manifest)) {
      bud.log(`overriding manifest setting from cli`)
      bud.hooks.on(`feature.manifest`, this.manifest)
    }
    if (isset(this.publicPath)) {
      bud.setPublicPath(this.publicPath)
    }

    if (
      bud.isRoot &&
      isset(this.filter) &&
      bud.children &&
      Object.keys(bud.children).length > 0
    ) {
      Object.keys(bud.children)
        .filter(name => !this.filter.includes(name))
        .map(name => {
          delete bud.children[name]
          bud.log(`removing ${name} instance from the cli`)
        })
    }

    if (isset(this.storage)) {
      bud.log(`overriding storage directory from the cli`)
      bud.setPath(`@storage`, this.storage)
    }

    if (isset(this.mode)) {
      bud.log(`overriding mode from the cli`)
      bud.hooks.on(`build.mode`, this.mode)
    }

    if (isset(this.cache)) {
      bud.log(`overriding cache settings from cli`)
      bud.persist(this.cache)
      bud.children &&
        Object.values(bud.children).map(child => child.persist(this.cache))
    }

    if (isset(this.minimize)) {
      bud.log(`overriding minimize setting from cli`)
      bud.minimize(this.minimize)
      bud.children &&
        Object.values(bud.children).map(child =>
          child.minimize(this.minimize),
        )
    }

    if (isset(this.devtool)) {
      bud.log(`overriding devtool from cli`)
      bud.devtool(this.devtool)
      bud.children &&
        Object.values(bud.children).map(child =>
          child.devtool(this.devtool),
        )
    }

    if (isset(this.esm)) {
      bud.log(`overriding esm from cli`)
      bud.esm.enable(this.esm)
      bud.children &&
        Object.values(bud.children).map(child =>
          child.esm.enable(this.esm),
        )
    }

    if (isset(this.immutable)) {
      bud.log(`overriding immutable from cli`)
      bud.cdn.freeze(this.immutable)
      bud.children &&
        Object.values(bud.children).map(child =>
          child.cdn.freeze(this.immutable),
        )
    }

    if (isset(this.clean)) {
      bud.log(`overriding clean setting from cli`)
      bud.extensions
        .get(`@roots/bud-extensions/clean-webpack-plugin`)
        .enable(this.clean)

      bud.hooks.on(`build.output.clean`, this.clean)
    }

    if (isset(this.hash)) {
      bud.log(`overriding hash setting from cli`)
      bud.hash(this.hash)
      bud.children &&
        Object.values(bud.children).map(child => child.hash(this.hash))
    }

    if (isset(this.html)) {
      isString(this.html) ? bud.html({template: this.html}) : bud.html()

      bud.children &&
        Object.values(bud.children).map(child =>
          isString(this.html)
            ? child.html({template: this.html})
            : child.html(),
        )
    }

    if (isset(this.runtime)) {
      bud.log(`overriding runtime setting from cli`)
      bud.runtime(this.runtime)
      bud.children &&
        Object.values(bud.children).map(child =>
          child.runtime(this.runtime),
        )
    }

    if (isset(this.splitChunks)) {
      bud.log(`overriding runtime setting from cli`)
      bud.splitChunks(this.splitChunks)
      bud.children &&
        Object.values(bud.children).map(child =>
          child.splitChunks(this.splitChunks),
        )
    }

    await bud.api.processQueue()
  }
}
