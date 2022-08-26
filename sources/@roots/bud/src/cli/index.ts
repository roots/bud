import * as context from '../context/index.js'
import ensureNotifierPermissions from '../notifier/ensureNotifierPermissions.js'
import * as cli from './app.js'
import {Commands} from './commands.js'
import {BuildCommand} from './commands/build.js'
import {CleanCommand} from './commands/clean.js'
import {DevCommand} from './commands/dev.js'
import {DoctorCommand} from './commands/doctor.js'
import {InstallCommand} from './commands/install.js'
import {ReplCommand} from './commands/repl.js'
import {ViewCommand} from './commands/view.js'

let initialized: boolean = false

let args: Array<string> = process.argv.slice(2)

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
  const basedirFind = args.findIndex(arg => arg == `--basedir`)
  const basedir =
    basedirFind !== -1 ? args[basedirFind + 1] : process.cwd()

  const ctx = await context.get(basedir)

  const application = cli.get(ctx.bud.label, ctx.bud.version)

  await ensureNotifierPermissions(ctx)

  application.register(cli.Builtins.HelpCommand)
  application.register(cli.Builtins.DefinitionsCommand)
  application.register(cli.Builtins.VersionCommand)

  application.register(BuildCommand)
  application.register(CleanCommand)
  application.register(DevCommand)
  application.register(DoctorCommand)
  application.register(InstallCommand)
  application.register(ReplCommand)
  application.register(ViewCommand)

  await Commands.get(application, ctx)
    .getCommands()
    .then(Commands.importCommandsFromPaths)
    .then(
      async fns =>
        await Promise.all(fns.map(async fn => await fn(application))),
    )

  application.runExit(args, {
    ...ctx,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
  })
}

/* ⚡️ */ bud()
