/* eslint-disable no-console */
import {Builtins, Cli} from 'clipanion'

import {makeContext} from '../context/index.js'
import {BuildCommand} from './commands/build.js'
import {CleanCommand} from './commands/clean.js'
import {DevCommand} from './commands/dev.js'
import {DoctorCommand} from './commands/doctor.js'
import {InstallCommand} from './commands/install.js'
import {TypecheckCommand} from './commands/typecheck.js'
import ensureNotifierPermissions from './notifier/ensureNotifierPermissions.js'

/**
 * Run Bud CLI
 *
 * @public
 */
const bud = async () => {
  /**
   * Execution context
   *
   * @see {@link https://mael.dev/clipanion/docs/contexts}
   */
  const context = await makeContext()

  await ensureNotifierPermissions(context)

  const application = new Cli({
    binaryLabel: context.application.label,
    binaryName: context.application.label,
    binaryVersion: context.application.version,
    enableCapture: false,
    enableColors: true,
  })

  application.register(Builtins.HelpCommand)
  application.register(Builtins.DefinitionsCommand)
  application.register(Builtins.VersionCommand)

  application.register(BuildCommand)
  application.register(CleanCommand)
  application.register(DevCommand)
  application.register(DoctorCommand)
  application.register(InstallCommand)
  application.register(TypecheckCommand)

  application.runExit(process.argv.slice(2), context)
}

/* ⚡️ */ bud()
