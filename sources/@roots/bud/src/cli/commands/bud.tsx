import {resolve} from 'node:path/win32'

import {Bud} from '@roots/bud'
import {checkDependencies} from '@roots/bud/cli/helpers/checkDependencies'
import {
  checkNoPackageManager,
  checkPackageManagerConflict,
} from '@roots/bud/cli/helpers/checkPackageManagerErrors'
import {isInternalDevelopmentEnv} from '@roots/bud/cli/helpers/isInternalDevelopmentEnv'
import {isset} from '@roots/bud/cli/helpers/isset'
import {Renderer} from '@roots/bud-dashboard/renderer'
import type {
  CommandContext,
  Context,
} from '@roots/bud-framework/options/context'
import {BaseContext, Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {Box, Text} from '@roots/bud-support/ink'
import {isString} from '@roots/bud-support/lodash-es'
import React from '@roots/bud-support/react'
import * as t from '@roots/bud-support/typanion'

import {Notifier} from '../../notifier/index.js'

export type {BaseContext, CommandContext, Context}
export {Option}

export interface ArgsModifier {
  <T extends Context[`args`]>(from: T): (on: T) => Promise<T>
}
export const ArgsModifier: ArgsModifier = from => async on => ({
  ...from,
  ...on,
})

/**
 * Bud command
 *
 * @public
 */
export default class BudCommand extends Command<CommandContext> {
  public declare bud?: Bud

  public static override usage = Command.Usage({
    description: `Run \`bud --help\` for usage information`,
    details: `\
      \`bud build production\` compiles source assets in \`production\` mode. Run \`bud build production --help\` for usage.

      \`bud build development\` compiles source assets in \`development\` mode and serves updated modules. Run \`bud build development --help\` for usage.
    `,
    examples: [[`compile source assets`, `$0 build`]],
  })

  public declare withArguments?: (
    args: Context[`args`],
  ) => Promise<Context[`args`]>

  public declare withSubcommandArguments?: (
    args: Context[`args`],
  ) => Promise<Context[`args`]>

  public declare withContext?: (
    context: CommandContext,
  ) => Promise<CommandContext>

  public declare withSubcommandContext?: (
    context: CommandContext,
  ) => Promise<CommandContext>

  public declare withBud?: (bud: Bud) => Promise<Bud>

  public declare notifier?: Notifier

  public basedir = Option.String(`--basedir,--cwd`, undefined, {
    description: `project base directory`,
    hidden: true,
  })
  public debug = Option.Boolean(`--debug`, undefined, {
    description: `Enable debug mode`,
  })
  public log = Option.Boolean(`--log`, undefined, {
    description: `Enable logging`,
    hidden: true,
  })
  public verbose = Option.Boolean(`--verbose`, undefined, {
    description: `Log verbose output`,
  })
  public mode = Option.String(`--mode`, undefined, {
    description: `Compilation mode`,
    validator: t.isOneOf([
      t.isLiteral(`production`),
      t.isLiteral(`development`),
    ]),
  })
  public filter = Option.Array(`--filter`, undefined, {
    description: `Limit command to particular compilers`,
  })

  public static async render(children: React.ReactElement) {
    await Renderer.render(children)
  }
  public static async renderOnce(children: React.ReactElement) {
    await Renderer.once(children)
  }
  public static async text(text: string) {
    await Renderer.text(text)
  }
  public async execute() {}

  public override async catch(error: string | {message: string}) {
    const message = isString(error)
      ? error
      : isString(error?.message)
      ? error.message
      : JSON.stringify(error)

    BudCommand.renderOnce(
      <Box flexDirection="column" marginY={1}>
        <Box>
          <Text backgroundColor="red" color="white">
            Error
          </Text>
        </Box>
        <Text>{` `}</Text>
        <Text wrap="end">{message}</Text>
      </Box>,
    )

    if (this.bud?.context.args.notify !== false) {
      this.notifier.notify({
        title: `bud.js`,
        subtitle: `Configuration error`,
        message: message,
        group: this.bud.path(),
      })
    }

    if (this.bud.isProduction) {
      // eslint-disable-next-line n/no-process-exit
      process.exit(1)
    }
  }

  public async makeBud<T extends BudCommand>(command: T) {
    command.context.basedir = command.basedir
      ? resolve(command.context.basedir, command.basedir)
      : command.context.basedir
    command.context.mode = command.mode ?? command.context.mode

    command.context.args = {
      ...command.context.args,
      basedir: command.context.basedir,
      debug: command.debug,
      mode: command.context.mode,
      log: command.log,
      target: command.filter,
      verbose: command.verbose,
    }

    if (command.withArguments) {
      command.context.args = await command.withArguments(
        command.context.args,
      )
    }
    if (command.withContext) {
      command.context = await command.withContext(command.context)
    }

    command.bud = await new Bud().lifecycle(command.context)

    command.notifier = new Notifier().setBud(command.bud)

    await command.applyBudEnv(command.bud)
    await command.applyBudManifestOptions(command.bud)
    await command.applyBudArguments(command.bud)
    await command.bud.processConfigs()

    if (command.withBud) {
      command.bud = await command.withBud(command.bud)
    }
  }

  public async run(command: BudCommand) {
    await command.applyBudArguments(command.bud)

    try {
      await command.bud.run()
    } catch (error) {
      throw error
    }
  }

  public async healthcheck(command: BudCommand) {
    try {
      if (!isInternalDevelopmentEnv(command.bud)) {
        checkNoPackageManager(command.bud)
        checkPackageManagerConflict(command.bud)
        await checkDependencies(command.bud)
      }
    } catch (error) {
      throw error
    }
  }

  @bind
  public async applyBudEnv(bud: Bud) {
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

  @bind
  public async applyBudManifestOptions(bud: Bud) {
    if (isset(bud.context.manifest?.bud?.[`publicPath`])) {
      bud.hooks.on(
        `build.output.publicPath`,
        bud.context.manifest.bud[`publicPath`],
      )
    }
    if (isset(bud.context.manifest?.bud?.paths?.[`src`])) {
      bud.hooks.on(`location.@src`, bud.context.manifest.bud.paths[`src`])
    }
    if (isset(bud.context.manifest?.bud?.paths?.[`dist`])) {
      bud.hooks.on(
        `location.@dist`,
        bud.context.manifest.bud.paths[`dist`],
      )
    }
    if (isset(bud.context.manifest?.bud?.paths?.[`storage`])) {
      bud.hooks.on(
        `location.@storage`,
        bud.context.manifest.bud.paths[`storage`],
      )
    }
  }

  /**
   * Apply context from argv
   *
   * @public
   */
  @bind
  public async applyBudArguments(bud: Bud) {
    if (isset(bud.context.args.input)) {
      bud.setPath(`@src`, bud.context.args.input)
    }

    if (isset(bud.context.args.output)) {
      bud.setPath(`@dist`, bud.context.args.output)
    }

    if (isset(bud.context.args.manifest)) {
      bud.log(`overriding manifest setting from cli`)
      bud.hooks.on(`feature.manifest`, bud.context.args.manifest)
    }

    if (isset(bud.context.args.publicPath)) {
      bud.setPublicPath(bud.context.args.publicPath)
    }
    if (isset(bud.context.args.filter) && bud.hasChildren) {
      Object.keys(bud.children)
        .filter(name => !bud.context.args.filter.includes(name))
        .map(name => {
          delete bud.children[name]
          bud.log(`removing ${name} instance from the cli`)
        })
    }

    if (isset(bud.context.args.storage)) {
      bud.log(`overriding storage directory from the cli`)
      bud.setPath(`@storage`, bud.context.args.storage)
    }

    if (isset(bud.context.args.mode)) {
      bud.log(`overriding mode from the cli`)
      bud.hooks.on(`build.mode`, bud.context.args.mode)
    }
    if (isset(bud.context.args.cache)) {
      bud.log(`overriding cache settings from cli`)
      bud.persist(bud.context.args.cache)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.persist(bud.context.args.cache),
        )
    }

    if (isset(bud.context.args.minimize)) {
      bud.log(`overriding minimize setting from cli`)
      bud.minimize(bud.context.args.minimize)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.minimize(bud.context.args.minimize),
        )
    }
    if (isset(bud.context.args.devtool)) {
      bud.log(`overriding devtool from cli`)
      bud.devtool(bud.context.args.devtool)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.devtool(bud.context.args.devtool),
        )
    }
    if (isset(bud.context.args.esm)) {
      bud.log(`overriding esm from cli`)
      bud.esm.enable(bud.context.args.esm)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.esm.enable(bud.context.args.esm),
        )
    }
    if (isset(bud.context.args.immutable)) {
      bud.log(`overriding immutable from cli`)
      bud.cdn.freeze(bud.context.args.immutable)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.cdn.freeze(bud.context.args.immutable),
        )
    }
    if (isset(bud.context.args.clean)) {
      bud.log(`overriding clean setting from cli`)
      bud.extensions
        .get(`@roots/bud-extensions/clean-webpack-plugin`)
        .enable(bud.context.args.clean)
      bud.hooks.on(`build.output.clean`, bud.context.args.clean)
    }
    if (isset(bud.context.args.hash)) {
      bud.context.logger.log(`hash enabled by --hash`)
      bud.hash(bud.context.args.hash)

      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.hash(bud.context.args.hash),
        )
    }

    if (isset(bud.context.args.html)) {
      isString(bud.context.args.html)
        ? bud.html({template: bud.context.args.html})
        : bud.html()

      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          isString(bud.context.args.html)
            ? child.html({template: bud.context.args.html})
            : child.html(),
        )
    }

    if (isset(bud.context.args.runtime)) {
      bud.log(`overriding runtime setting from cli`)
      bud.runtime(bud.context.args.runtime)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.runtime(bud.context.args.runtime),
        )
    }

    if (isset(bud.context.args.splitChunks)) {
      bud.log(`overriding runtime setting from cli`)
      bud.splitChunks(bud.context.args.splitChunks)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.splitChunks(bud.context.args.splitChunks),
        )
    }
  }
}
