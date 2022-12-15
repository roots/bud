import {argv, basedir} from '@roots/bud/context/argv'
import {Builtins, Cli, CommandClass} from '@roots/bud-support/clipanion'

import getContext from '../context/index.js'
import BuildCommand from './commands/build.base.js'
import BuildDevelopmentCommand from './commands/build.development.js'
import BuildProductionCommand from './commands/build.production.js'
import CleanCommand from './commands/clean.js'
import DoctorCommand from './commands/doctor.js'
import ReplCommand from './commands/repl.js'
import UpgradeCommand from './commands/upgrade.js'
import ViewCommand from './commands/view.js'
import WebpackCommand from './commands/webpack.js'
import {Commands} from './finder.js'

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
