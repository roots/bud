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
import {Error} from '@roots/bud-dashboard/app'
import type {CommandClass} from '@roots/bud-support/clipanion'
import {Builtins, Cli} from '@roots/bud-support/clipanion'
import logger from '@roots/bud-support/logger'
import * as args from '@roots/bud-support/utilities/args'
import {render} from '@roots/bud-support/ink'

import BudDoctorCommand from './commands/doctor/index.js'
import BudReplCommand from './commands/repl/index.js'
import type {CLIContext} from './index.js'

let application: Cli
let context: Context | CLIContext

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

const isCLIContext = (
  context: Context & {
    stdout?: NodeJS.WriteStream
    stderr?: NodeJS.WriteStream
    stdin?: NodeJS.ReadStream
    stdio?: NodeJS.WriteStream
  },
): context is CLIContext =>
  context.basedir !== undefined &&
  context.stdout !== undefined &&
  context.stderr !== undefined &&
  context.stdin !== undefined

try {
  context = {
    ...(await getContext()),
    stdin: global.process.stdin,
    stdout: global.process.stdout,
    stderr: global.process.stderr,
    colorDepth: 256,
  }

  if (!isCLIContext(context)) throw `Invalid context`
} catch (err) {
  render(<Error error={err} />)
  global.process.exit(1)
}

application = new Cli({
  binaryLabel: `bud`,
  binaryName: `bud`,
  binaryVersion: context.bud.version,
  enableCapture: true,
  enableColors: true,
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
  .catch(err => render(<Error error={err} />))

export {application, Builtins, Cli}
export type {CommandClass}
