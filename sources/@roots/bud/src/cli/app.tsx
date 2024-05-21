import type {BaseContext, CommandClass} from '@roots/bud-support/clipanion'

import {exit, stderr, stdin, stdout} from 'node:process'

import BudCommand from '@roots/bud/cli/commands'
import BudBuildCommand from '@roots/bud/cli/commands/build'
import BudBuildDevelopmentCommand from '@roots/bud/cli/commands/build/development'
import BudBuildProductionCommand from '@roots/bud/cli/commands/build/production'
import BudCleanCommand from '@roots/bud/cli/commands/clean'
import BudConfigCommand from '@roots/bud/cli/commands/config'
import BudDoctorCommand from '@roots/bud/cli/commands/doctor'
import BudEnvCommand from '@roots/bud/cli/commands/env'
import BudReplCommand from '@roots/bud/cli/commands/repl'
import BudUpgradeCommand from '@roots/bud/cli/commands/upgrade'
import BudViewCommand from '@roots/bud/cli/commands/view'
import BudWebpackCommand from '@roots/bud/cli/commands/webpack'
import {Finder} from '@roots/bud/cli/finder'
import getContext, {type Context} from '@roots/bud/context'
import {render as renderError} from '@roots/bud-dashboard/components/error'
import * as args from '@roots/bud-framework/bootstrap/args'
import {Builtins, Cli} from '@roots/bud-support/clipanion'
import {BudError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/isFunction'
import isUndefined from '@roots/bud-support/isUndefined'
import logger from '@roots/bud-support/logger'

/**
 * Error handler
 * @param error
 */
const onError = (error: Error) => {
  renderError(error)
  exit(1)
}

/**
 * {@link Context}
 */
const context = await getContext({stderr, stdin, stdout}).catch(onError)
context.stderr = stderr
context.stdin = stdin
context.stdout = stdout

/**
 * {@link Cli}
 */
const application = new Cli<BaseContext & Context>({
  binaryLabel: `bud`,
  binaryName: `bud`,
  binaryVersion: context.bud.version,
  enableColors: context.env?.color !== `false`,
})

/**
 * {@link Finder}
 */
const finder = new Finder(context, application)

/**
 * Register commands
 */
;[
  Builtins.HelpCommand,
  Builtins.VersionCommand,
  BudCommand,
  BudBuildCommand,
  BudBuildDevelopmentCommand,
  BudBuildProductionCommand,
  BudCleanCommand,
  BudConfigCommand,
  BudDoctorCommand,
  BudEnvCommand,
  BudReplCommand,
  BudUpgradeCommand,
  BudViewCommand,
  BudWebpackCommand,
].map(command => application.register(command))

/**
 * --force flag
 * {@link Context.force}
 */
const forceFlag = !isUndefined(context.force) ? context.force : false

/**
 * Register command extensions
 *
 * @param force - force rebuilding of extension cache
 */
const registerFoundCommands = async (force: boolean = forceFlag) => {
  if (!force) {
    logger.scope(`cli`).log(`Loading commands from cache...`)
    await finder.init()
  } else {
    logger.scope(`cli`).log(`Searching for commands...`)

    await finder.getModules()

    if (finder.paths.length > 0) {
      logger.scope(`cli`).log(`Found ${finder.paths.length} commands.`)
      logger.scope(`cli`).log(`Updating command cache...`)
      await finder.cacheWrite()
    }
  }

  if (!finder.paths.length) {
    logger.scope(`cli`).log(`No commands found.`)
    return
  }

  const extensions = await finder.importCommands()

  return await Promise.all(
    extensions.map(
      async ([path, registerCommand]: [
        string,
        (application: Cli) => Promise<any>,
      ]) => {
        logger.scope(`cli`).log(`Registering ${path}...`)

        if (!isFunction(registerCommand)) {
          logger.scope(`cli`).error(`Error registering ${path}`)

          throw BudError.normalize(
            `${path} does not export a module exporting a registration function.`,
            {
              details: `Error registering ${path}`,
              thrownBy: import.meta.url,
            },
          )
        }

        await registerCommand(application).catch(error => {
          logger.scope(`cli`).error(`Error registering ${path}`, error)
          throw BudError.normalize(error, {
            details: `Error registering ${path}`,
            thrownBy: import.meta.url,
          })
        })
      },
    ),
  ).catch(onError)
}

// first round will attempt to register extensions from cache
// if cache does not exist, it will be created
await registerFoundCommands().catch(async error => {
  // first round failed to load extensions for some reason
  // maybe a cached extension no longer exists
  // or maybe a cached extension has been updated and the old path is resolvable but no longer valid
  // so we'll try searching again and force a rebuild of the cache
  // if it still fails we'll throw and exit the process
  await registerFoundCommands(true).catch(onError)
})

/**
 * Run application and exit when process is complete
 */
await application.runExit(args.raw, context)

export {application, Builtins, Cli}
export type {CommandClass}
