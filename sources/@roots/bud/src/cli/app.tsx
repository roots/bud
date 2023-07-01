import type {CommandClass} from '@roots/bud-support/clipanion'

import {Error} from '@roots/bud-dashboard/app'
import {Builtins, Cli} from '@roots/bud-support/clipanion'
import {BudError} from '@roots/bud-support/errors'
import {render} from '@roots/bud-support/ink'
import * as args from '@roots/bud-support/utilities/args'
import BudCommand from '@roots/bud/cli/commands/bud'
import BudBuildCommand from '@roots/bud/cli/commands/bud.build'
import BudBuildDevelopmentCommand from '@roots/bud/cli/commands/bud.build.development'
import BudBuildProductionCommand from '@roots/bud/cli/commands/bud.build.production'
import BudCleanCommand from '@roots/bud/cli/commands/bud.clean'
import BudUpgradeCommand from '@roots/bud/cli/commands/bud.upgrade'
import BudViewCommand from '@roots/bud/cli/commands/bud.view'
import BudWebpackCommand from '@roots/bud/cli/commands/bud.webpack'
import {Commands} from '@roots/bud/cli/finder'
import getContext, {type Context} from '@roots/bud/context'
import {exit, stderr, stdin, stdout} from 'node:process'

import type {CLIContext} from './index.js'

import BudDoctorCommand from './commands/doctor/index.js'
import BudReplCommand from './commands/repl/index.js'

let application: Cli
let context: CLIContext | Context

const commands = [
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

const onError = (error: Error) => {
  render(<Error error={BudError.normalize(error)} />)
  exit(1)
}

const budContext = await getContext().catch(onError)

context = {...budContext, stderr, stdin, stdout}

application = new Cli({
  binaryLabel: `bud`,
  binaryName: `bud`,
  binaryVersion: context.bud.version,
  enableCapture: true,
  enableColors: context.env?.color !== `false`,
})

commands.map(command => application.register(command))

await Commands.get(application, context)
  .getCommands()
  .then(Commands.importCommandsFromPaths)
  .then(
    async registrar =>
      await Promise.all(
        registrar.map(
          async (registerCommand: (application: Cli) => Promise<any>) =>
            await registerCommand(application).catch(onError),
        ),
      ),
  )
  .catch(onError)

application.runExit(args.raw, context).catch(onError)

export {application, Builtins, Cli}
export type {CommandClass}
