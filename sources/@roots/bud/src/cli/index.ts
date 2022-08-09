/* eslint-disable no-console */
import * as context from '../context/index.js'
import ensureNotifierPermissions from '../notifier/ensureNotifierPermissions.js'
import * as cli from './app.js'
import {Commands} from './commands.js'
import {BuildCommand} from './commands/build.js'
import {CleanCommand} from './commands/clean.js'
import {DevCommand} from './commands/dev.js'
import {DoctorCommand} from './commands/doctor.js'
import {InstallCommand} from './commands/install.js'

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
  const ctx = await context.get(process.cwd())

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

  await Commands.get(application, ctx)
    .getCommands()
    .then(Commands.importCommandsFromPaths)
    .then(
      async fns =>
        await Promise.all(fns.map(async fn => await fn(application))),
    )

  application.runExit(process.argv.slice(2), {
    ...ctx,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
  })
}

/* ⚡️ */ bud()
