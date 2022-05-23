import {Config} from '@roots/bud-framework'
import {execa} from '@roots/bud-support'
import {Builtins, Cli} from 'clipanion'
import {platform} from 'node:os'
import {join} from 'node:path'

import {makeContext} from '../context'
import {BuildCommand} from './commands/build'
import {CleanCommand} from './commands/clean'
import {DevCommand} from './commands/dev'
import {DoctorCommand} from './commands/doctor'
import {InstallCommand} from './commands/install'

/**
 * Register ts-node if available
 *
 * @public
 */
const tsNode = async (context: Config.Context) => {
  if (
    context.disk.config &&
    Object.keys(context.disk.config)?.filter(
      config => config.endsWith('.ts') && config.includes('bud.config'),
    ).length
  ) {
    try {
      const {register} = await import('ts-node')
      register({transpileOnly: true})
    } catch (err) {
      context.stderr.write(
        `You must install ts-node in order to configure bud with typescript`,
      )
      context.stderr.write(err)
    }
  }
}

/**
 * Ensure notifier permissions (macOS)
 * @param context - application context
 * @public
 */
const notifier = async (context: Config.Context) => {
  if (platform() === 'darwin') {
    try {
      const notifierPath = join(
        context.application.dir,
        'vendor',
        'mac.no-index',
        'roots-notifier.app',
        'Contents',
        'MacOS',
        'roots-notifier',
      )

      await execa.execa(`chmod`, [`u+x`, notifierPath])
    } catch (err) {}
  }
}

/**
 * Run Bud CLI
 *
 * @public
 */
const bud = async () => {
  /**
   * Execution context
   * @see {@link https://mael.dev/clipanion/docs/contexts}
   */
  const context = await makeContext()

  await tsNode(context)
  await notifier(context)

  const application = new Cli({
    binaryLabel: context.application.label,
    binaryName: context.application.label,
    binaryVersion: context.application.version,
    enableCapture: true,
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

  application.runExit(process.argv.slice(2), context)
}

/* ⚡️ */ bud()
