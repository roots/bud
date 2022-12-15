import BuildCommand from '@roots/bud/cli/commands/build.base'
import BuildDevelopmentCommand from '@roots/bud/cli/commands/build.development'
import BuildProductionCommand from '@roots/bud/cli/commands/build.production'
import CleanCommand from '@roots/bud/cli/commands/clean'
import DoctorCommand from '@roots/bud/cli/commands/doctor'
import ReplCommand from '@roots/bud/cli/commands/repl'
import UpgradeCommand from '@roots/bud/cli/commands/upgrade'
import ViewCommand from '@roots/bud/cli/commands/view'
import WebpackCommand from '@roots/bud/cli/commands/webpack'
import {Commands} from '@roots/bud/cli/finder'
import getContext from '@roots/bud/context'
import {argv, basedir} from '@roots/bud/context/argv'
import {Builtins, Cli, CommandClass} from '@roots/bud-support/clipanion'

const context = await getContext(basedir)

const application = new Cli({
  binaryLabel: `bud`,
  binaryName: `bud`,
  enableCapture: false,
  enableColors: true,
})

application.register(Builtins.HelpCommand)
application.register(Builtins.DefinitionsCommand)
application.register(Builtins.VersionCommand)

application.register(BuildCommand)
application.register(BuildDevelopmentCommand)
application.register(BuildProductionCommand)
application.register(CleanCommand)
application.register(DoctorCommand)
application.register(ReplCommand)
application.register(UpgradeCommand)
application.register(ViewCommand)
application.register(WebpackCommand)

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
})

export {application, Builtins, Cli, CommandClass}
