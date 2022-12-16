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
import {argv, basedir} from '@roots/bud/context/argv'
import {Builtins, Cli, CommandClass} from '@roots/bud-support/clipanion'

const context = await getContext(basedir, true)

const application = new Cli({
  binaryLabel: `bud`,
  binaryName: `bud`,
  enableCapture: false,
  enableColors: true,
})

application.register(Builtins.HelpCommand)
application.register(Builtins.DefinitionsCommand)
application.register(Builtins.VersionCommand)

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

application.runExit(argv, {
  ...context,
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr,
  colorDepth: 256,
})

export {application, Builtins, Cli, CommandClass}
