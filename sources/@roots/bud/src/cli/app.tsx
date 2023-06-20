import type {CommandClass} from '@roots/bud-support/clipanion'

import {Error} from '@roots/bud-dashboard/app'
import {Builtins, Cli} from '@roots/bud-support/clipanion'
import {BudError} from '@roots/bud-support/errors'
import {render} from '@roots/bud-support/ink'
import logger from '@roots/bud-support/logger'
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
import process from 'node:process'

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

try {
  context = {
    ...(await getContext()),
    colorDepth: 256,
    stderr: process.stderr,
    stdin: process.stdin,
    stdout: process.stdout,
  }
} catch (error) {
  render(<Error error={BudError.normalize(error)} />)
}

application = new Cli({
  binaryLabel: `bud`,
  binaryName: `bud`,
  binaryVersion: context.bud.version,
  enableCapture: false,
  enableColors: context.env?.color !== `false`,
})

commands.map(command => application.register(command))

await Commands.get(application, context)
  .getCommands()
  .then(Commands.importCommandsFromPaths)
  .then(
    async fns =>
      await Promise.all(
        fns.map(
          async (registerCommand: (application: Cli) => Promise<any>) => {
            try {
              await registerCommand(application)
            } catch (err) {
              logger.error(`Problem registering CLI command:`, `\n`, err)
            }
          },
        ),
      ),
  )

application
  .runExit(args.raw, context)
  .catch(error => render(<Error error={BudError.normalize(error)} />))

export {application, Builtins, Cli}
export type {CommandClass}
