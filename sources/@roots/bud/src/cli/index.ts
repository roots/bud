import * as argv from '../context/argv.js'
import * as context from '../context/index.js'
import ensureNotifierPermissions from '../notifier/ensureNotifierPermissions.js'
import * as cli from './app.js'
import {Commands} from './commands.js'
import BuildCommand from './commands/build.base.js'
import BuildDevelopmentCommand from './commands/build.development.js'
import BuildProductionCommand from './commands/build.production.js'
import CleanCommand from './commands/clean.js'
import DoctorCommand from './commands/doctor.js'
import ReplCommand from './commands/repl.js'
import UpgradeCommand from './commands/upgrade.js'
import ViewCommand from './commands/view.js'
import WebpackCommand from './commands/webpack.js'

let initialized: boolean = false

/**
 * Run Bud CLI
 *
 * @public
 */
const bud = async () => {
  if (initialized) return
  else initialized = true

  /**
   * Execution context
   *
   * @see {@link https://mael.dev/clipanion/docs/contexts}
   */
  const ctx = await context.get(argv.basedir)
  const application = cli.get(ctx.bud.label, ctx.bud.version)

  await ensureNotifierPermissions()

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

  await Commands.get(application, ctx)
    .getCommands()
    .then(Commands.importCommandsFromPaths)
    .then(
      async fns =>
        await Promise.all(fns.map(async fn => await fn(application))),
    )

  application.runExit(argv.args, {
    ...ctx,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
  })
}

/* ⚡️ */ bud()
