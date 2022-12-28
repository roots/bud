import {resolve} from 'node:path/win32'

import {Bud} from '@roots/bud'
import {checkDependencies} from '@roots/bud/cli/helpers/checkDependencies'
import {checkPackageManagerErrors} from '@roots/bud/cli/helpers/checkPackageManagerErrors'
import {isInternalDevelopmentEnv} from '@roots/bud/cli/helpers/isInternalDevelopmentEnv'
import {isset} from '@roots/bud/cli/helpers/isset'
import {Renderer} from '@roots/bud/cli/renderer'
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

import type {Notifier} from '../../notifier/index.js'

export type {BaseContext, CommandContext, Context}
export {Option}

export interface ArgsModifier {
  <T extends CommandContext[`args`]>(from: T): (on: T) => Promise<T>
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
  public declare bud?: (Bud & {context: CommandContext}) | undefined

  public get bin() {
    // eslint-disable-next-line n/no-process-env
    return process.env.BUD_JS_BIN
  }

  public declare context: CommandContext

  public static override usage = Command.Usage({
    description: `Run \`bud --help\` for usage information`,
    details: `\
      \`bud build production\` compiles source assets in \`production\` mode. Run \`bud build production --help\` for usage.

      \`bud build development\` compiles source assets in \`development\` mode and serves updated modules. Run \`bud build development --help\` for usage.
    `,
    examples: [[`compile source assets`, `$0 build`]],
  })

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
    bud: BudCommand[`bud`],
  ) => Promise<BudCommand[`bud`]>

  public declare notifier?: Notifier
  public declare notify?: boolean

  public cwd = Option.String(`--basedir,--cwd`, undefined, {
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

  public declare renderer: Renderer
  public async render(children: React.ReactElement) {
    await this.renderer?.render(children)
  }
  public async renderOnce(children: React.ReactElement) {
    await this.renderer?.once(children)
  }
  public async text(text: string) {
    await this.renderer?.text(text)
  }

  public constructor() {
    super()
    this.renderer = new Renderer(process.stdout)
  }

  public async execute() {}

  public override async catch(value: unknown) {
    const normalizeError = (value: unknown): Error => {
      if (value instanceof Error) return value
      if (isString(value)) return new Error(value)
      if (value instanceof Object) {
        try {
          return new Error(JSON.stringify(value, null, 2))
        } catch (error) {
          return new Error(value.toString())
        }
      }
    }

    process.exitCode = 1
    const error = normalizeError(value)

    error.name = error.name ? ` ${error.name} ` : ` Error `
    error.stack = error.stack?.split(`  at `).splice(0, 2).join(`  at `)

    if (this.notifier) {
      try {
        this.notifier?.notify({
          title: `bud.js`,
          subtitle: `Configuration error`,
          message: error.message,
          group: this.bud.path(),
        })
      } catch (error) {
        // fallthrough
      }
    }

    this.render(
      <Box flexDirection="column" marginTop={1}>
        <Box marginBottom={1}>
          <Text backgroundColor="red" color="white">
            {error.name}
          </Text>
        </Box>

        <Box>
          <Text>{error.message}</Text>
        </Box>
      </Box>,
    )

    if (this.bud?.isProduction) {
      // eslint-disable-next-line n/no-process-exit
      this.bud.close()
      this.renderer.cleanup()
      await this.renderer.instance?.waitUntilExit()
    }
  }

  public async makeBud<T extends BudCommand>(command: T) {
    command.context.basedir = command.cwd
      ? resolve(command.context.basedir, command.cwd)
      : command.context.basedir

    command.context.mode = command.mode ?? command.context.mode

    command.context.args = {
      ...command.context.args,
      basedir: command.context.basedir,
      debug: command.debug,
      filter: command.filter,
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

    if (command.context.mode === `development`) {
      await import(`../env.development.js`)
    } else {
      await import(`../env.production.js`)
    }

    const bud = await new Bud().lifecycle(command.context)

    bud.dashboard.setRenderer(this.renderer)

    if (!bud.isCLI()) throw new Error(`problem instantiating bud`)

    command.bud = bud

    if (command.notify !== false) {
      const {Notifier} = await import(`../../notifier/index.js`)
      command.notifier = new Notifier().setBud(command.bud)
    }

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

  @bind
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

  public async healthcheck(command: BudCommand) {
    try {
      if (!isInternalDevelopmentEnv(command.bud)) {
        checkPackageManagerErrors(command.bud)
        await checkDependencies(command.bud)
      }
    } catch (error) {}
  }

  @bind
  public async applyBudEnv(bud: Bud) {
    if (bud.env.isString(`APP_MODE`)) {
      bud.hooks.on(`build.mode`, bud.env.get(`APP_MODE`))
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
    const {bud: manifest} = bud.context.manifest
    if (!manifest) return

    if (isset(manifest.publicPath))
      bud.hooks.on(`build.output.publicPath`, manifest.bud.publicPath)

    if (isset(manifest.paths?.src))
      bud.hooks.on(`location.@src`, manifest.bud.paths.src)

    if (isset(manifest.paths?.dist))
      bud.hooks.on(`location.@dist`, manifest.bud.paths.dist)

    if (isset(manifest.paths?.[`storage`]))
      bud.hooks.on(`location.@storage`, manifest.bud.paths[`storage`])
  }

  /**
   * Apply context from argv
   *
   * @public
   */
  @bind
  public async applyBudArguments(bud: BudCommand[`bud`]) {
    const {args, logger} = bud.context

    if (isset(args.input)) bud.setPath(`@src`, args.input)
    if (isset(args.output)) bud.setPath(`@dist`, args.output)
    if (isset(args.publicPath)) bud.setPublicPath(args.publicPath)

    if (isset(args.filter) && bud.hasChildren) {
      Object.keys(bud.children)
        .filter(name => !args.filter.includes(name))
        .map(name => {
          delete bud.children[name]
          bud.log(`removing ${name} instance from the cli`)
        })
    }

    if (isset(args.manifest)) {
      bud.log(`overriding manifest setting from cli`)
      bud.hooks.on(`feature.manifest`, args.manifest)
    }

    if (isset(args.storage)) {
      bud.log(`overriding storage directory from the cli`)
      bud.setPath(`@storage`, args.storage)
    }

    if (isset(args.cache)) {
      bud.log(`overriding cache settings from cli`)
      bud.persist(args.cache)
      bud.hasChildren &&
        Object.values(bud.children).map(child => child.persist(args.cache))
    }

    if (isset(args.minimize)) {
      bud.log(`overriding minimize setting from cli`)
      bud.minimize(args.minimize)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.minimize(args.minimize),
        )
    }

    if (isset(args.devtool)) {
      bud.log(`overriding devtool from cli`)
      bud.devtool(args.devtool)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.devtool(args.devtool),
        )
    }

    if (isset(args.esm)) {
      bud.log(`overriding esm from cli`)
      bud.esm.enable(args.esm)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.esm.enable(args.esm),
        )
    }

    if (isset(args.immutable)) {
      bud.log(`overriding immutable from cli`)
      bud.cdn.freeze(args.immutable)
      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          child.cdn.freeze(args.immutable),
        )
    }
    if (isset(args.clean)) {
      bud.log(`overriding clean setting from cli`)
      bud.extensions
        .get(`@roots/bud-extensions/clean-webpack-plugin`)
        .enable(args.clean)
      bud.hooks.on(`build.output.clean`, args.clean)
    }

    if (isset(args.hash)) {
      logger.log(`hash enabled by --hash`)
      bud.hash(args.hash)

      bud.hasChildren &&
        Object.values(bud.children).map(child => child.hash(args.hash))
    }

    if (isset(args.html)) {
      isString(args.html) ? bud.html({template: args.html}) : bud.html()

      bud.hasChildren &&
        Object.values(bud.children).map(child =>
          isString(args.html)
            ? child.html({template: args.html})
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

    if (isset(args.hot))
      bud.hooks.on(`dev.middleware.enabled`, (middleware = []) => {
        return middleware.filter(key => key !== `hot`)
      })

    if (isset(args.port)) bud.serve(args.port)
  }
}
