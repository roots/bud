import BudCommand from '@roots/bud/cli/commands/bud'
import BudBuildCommand from '@roots/bud/cli/commands/bud.build'
import BudBuildDevelopmentCommand from '@roots/bud/cli/commands/bud.build.development'
import BudBuildProductionCommand from '@roots/bud/cli/commands/bud.build.production'
import BudCleanCommand from '@roots/bud/cli/commands/bud.clean'
import BudDoctorCommand from '@roots/bud/cli/commands/bud.doctor'
import BudReplCommand from '@roots/bud/cli/commands/bud.repl'
import BudUpgradeCommand from '@roots/bud/cli/commands/bud.upgrade'
import BudViewCommand from '@roots/bud/cli/commands/bud.view'
import BudWebpackCommand from '@roots/bud/cli/commands/bud.webpack'
import {Commands} from '@roots/bud/cli/finder'
import getContext from '@roots/bud/context'
import {Builtins, Cli, CommandClass} from '@roots/bud-support/clipanion'
import * as args from '@roots/bud-support/utilities/args'
import * as paths from '@roots/bud-support/utilities/paths'

const {basedir} = paths.get(process.cwd())

const context = await getContext({
  basedir,
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr,
  colorDepth: 256,
})

const application = new Cli({
  binaryLabel: `bud`,
  binaryName: `bud`,
  binaryVersion: context.bud?.version ?? undefined,
  enableCapture: false,
  enableColors: true,
})

application.register(Builtins.HelpCommand)
application.register(Builtins.DefinitionsCommand)
application.register(Builtins.VersionCommand)

application.register(BudCommand)
application.register(BudBuildCommand)
application.register(BudBuildDevelopmentCommand)
application.register(BudBuildProductionCommand)
application.register(BudCleanCommand)
application.register(BudDoctorCommand)
application.register(BudReplCommand)
application.register(BudUpgradeCommand)
application.register(BudViewCommand)
application.register(BudWebpackCommand)

await Commands.get(application, context)
  .getCommands()
  .then(Commands.importCommandsFromPaths)
  .then(
    async fns =>
      await Promise.all(fns.map(async fn => await fn(application))),
  )

application.runExit(args.raw, context)

export {application, Builtins, Cli, CommandClass}
