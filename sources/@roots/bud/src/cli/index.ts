import * as argv from '../context/argv.js'
import {get} from '../context/get.js'
import * as Notifier from '../notifier/index.js'
import * as cli from './app.js'
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

/**
 * Execution context
 *
 * @see {@link https://mael.dev/clipanion/docs/contexts}
 */
const context = await get(argv.basedir)
const application = cli.get(context.bud.label, context.bud.version)

await Notifier.ensurePermissions()

application.register(cli.Builtins.HelpCommand)
application.register(cli.Builtins.DefinitionsCommand)
application.register(cli.Builtins.VersionCommand)

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

application.runExit(argv.args, {
  ...context,
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr,
})

// dead export for top-level await
export {}
