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
import {Error} from '@roots/bud-dashboard/components/error'
import * as args from '@roots/bud-framework/context/args'
import {Builtins, Cli} from '@roots/bud-support/clipanion'
import {BudError} from '@roots/bud-support/errors'
import {render} from '@roots/bud-support/ink'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * Error handler
 * @param error
 */
const onError = (error: Error) => {
  render(<Error error={BudError.normalize(error)} />)
  exit(1)
}

/**
 * {@link Context}
 */
const context: Context = {
  ...(await getContext({stderr, stdin, stdout}).catch(onError)),
  stderr,
  stdin,
  stdout,
}

/**
 * {@link Cli}
 */
const application = new Cli<BaseContext & Context>({
  binaryLabel: `bud`,
  binaryName: `bud`,
  binaryVersion: context.bud.version,
  enableCapture: true,
  enableColors: context.env?.color !== `false`,
})

/**
 * Register built-ins
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
  try {
    const finder = new Finder(context, application)
    if (!force) await finder.init()
    else {
      await finder.getModules()
      await finder.cacheWrite()
    }

    const extensions = await finder.importCommands()

    return await Promise.all(
      extensions.map(
        async ([path, registerCommand]: [
          string,
          (application: Cli) => Promise<any>,
        ]) => {
          if (!isFunction(registerCommand))
            throw `${path} does not export a module exporting a registration function.`

          await registerCommand(application).catch(error => {
            throw new BudError(error, {thrownBy: path})
          })
        },
      ),
    )
  } catch (error) {
    throw error
  }
}

try {
  // first round will attempt to register extensions from cache
  // if cache does not exist, it will be created
  await registerFoundCommands()
} catch (error) {
  try {
    // first round failed to load extensions for some reason
    // maybe a cached extension no longer exists
    // or maybe a cached extension has been updated and the old path is resolvable but no longer valid
    // so we'll try searching again
    await registerFoundCommands(true)
  } catch (innerError) {
    // at this point we know that the error is not related to a suspect cache
    // so we'll present it to the user
    // and bail on the application
    const initializeExtensionsError =
      innerError instanceof BudError
        ? innerError
        : BudError.normalize(innerError)

    initializeExtensionsError.origin =
      error instanceof BudError ? error : BudError.normalize(error)

    onError(initializeExtensionsError)
  }
}

/**
 * Run application and exit when process is complete
 */
application.runExit(args.raw, context).catch(onError)

export {application, Builtins, Cli}
export type {CommandClass}
