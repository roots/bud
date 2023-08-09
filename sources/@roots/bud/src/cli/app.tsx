import type {CommandClass} from '@roots/bud-support/clipanion'

import {exit, stderr, stdin, stdout} from 'node:process'

import {Error} from '@roots/bud-dashboard/components/error'
import {Builtins, Cli} from '@roots/bud-support/clipanion'
import {BudError} from '@roots/bud-support/errors'
import {render} from '@roots/bud-support/ink'
import isFunction from '@roots/bud-support/lodash/isFunction'
import * as args from '@roots/bud-support/utilities/args'
import BudCommand from '@roots/bud/cli/commands'
import BudBuildCommand from '@roots/bud/cli/commands/build'
import BudBuildDevelopmentCommand from '@roots/bud/cli/commands/build/development'
import BudBuildProductionCommand from '@roots/bud/cli/commands/build/production'
import BudCleanCommand from '@roots/bud/cli/commands/clean'
import BudDoctorCommand from '@roots/bud/cli/commands/doctor'
import BudReplCommand from '@roots/bud/cli/commands/repl'
import BudUpgradeCommand from '@roots/bud/cli/commands/upgrade'
import BudViewCommand from '@roots/bud/cli/commands/view'
import BudWebpackCommand from '@roots/bud/cli/commands/webpack'
import {Finder} from '@roots/bud/cli/finder'
import getContext, {type Context} from '@roots/bud/context'

/**
 * Error handler
 * @param error
 */
const onError = (error: Error) => {
  render(<Error error={BudError.normalize(error)} />)
  exit(1)
}

/**
 * Built-in commands
 */
const commands: Array<CommandClass> = [
  Builtins.HelpCommand,
  Builtins.VersionCommand,
  BudCommand,
  BudBuildCommand,
  BudBuildDevelopmentCommand,
  BudBuildProductionCommand,
  BudCleanCommand,
  BudDoctorCommand,
  BudReplCommand,
  BudUpgradeCommand,
  BudViewCommand,
  BudWebpackCommand,
]

/**
 * {@link Context}
 */
const context: Context = {
  ...(await getContext({stderr, stdin, stdout}).catch(onError)),
  stderr,
  stdin,
  stdout,
}

const application = new Cli({
  binaryLabel: `bud`,
  binaryName: `bud`,
  binaryVersion: context.bud.version,
  enableCapture: true,
  enableColors: context.env?.color !== `false`,
})

/**
 * Register command extensions
 */
const registerFoundCommands = async (force: boolean = false) => {
  try {
    const finder = new Finder(context, application)
    if (!force) await finder.init()
    else {
      await finder.findRegistrationModules()
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
            throw new BudError(error, {
              thrownBy: path,
            })
          })
        },
      ),
    )
  } catch (error) {
    throw error
  }
}

commands.map(command => application.register(command))

try {
  await registerFoundCommands()
} catch (error) {
  // first round failed to load extensions for some reason
  // so we'll try searching again
  try {
    await registerFoundCommands(true).catch(onError)
  } catch (innerError) {
    const fatalError = BudError.normalize(innerError)
    fatalError.cause = error
    fatalError.message = `Failed to load bud cli extensions`
    onError(fatalError)
  }
}

application.runExit(args.raw, context).catch(onError)

export {application, Builtins, Cli}
export type {CommandClass}
