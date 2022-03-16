#!/usr/bin/env node

// @ts-check

const { platform } = require('node:os')
const { join } = require('node:path')

const { execa } = require('@roots/bud-support')
const { Cli, Builtins } = require('clipanion')

const { BuildCommand, CleanCommand, DevCommand, DoctorCommand, InstallCommand } = require('../lib/cjs/cli/index.js')
const { makeContext } = require('../lib/cjs/context/index.js')

/**
 * Run Bud CLI
 *
 * @public
 */
const bud = async () => {
  /**
   * Arguments
   *
   * @public
   */
  const argv = process.argv.splice(2)

  /**
   * Execution context
   *
   * @see {@link https://mael.dev/clipanion/docs/contexts}
   */
  const context = await makeContext()

  /**
   * Attempt to load ts-node if available and applicable
   */
  if (
    context.disk.config &&
      Object.keys(context.disk.config)?.filter(config =>
        config.endsWith('.ts') && config.includes('bud.config')
      ).length
  ) {
    try {
      const { register } = await import('ts-node')
      register({ transpileOnly: true })
    } catch (err) {
      context.stderr.write(`You must install ts-node in order to configure bud with typescript`)
      context.stderr.write(err)
    }
  }

  /**
   * MacOS notifier permissions
   */
  if (platform() === 'darwin') {
    try {
      const notifierPath = join(
        context.application.dir,
        'vendor',
        'mac.no-index',
        'roots-notifier.app',
        'Contents',
        'MacOS',
        'roots-notifier'
      )

      await execa.execa(`chmod`, [`u+x`, notifierPath])
    } catch (err) { }
  }

  /**
   * CLI instantiation
   *
   * @see {@link https://mael.dev/clipanion/docs/api/cli}
   *
   * @public
   */
  const application = new Cli({
    binaryLabel: context.application.name,
    binaryName: context.application.name,
    binaryVersion: context.application.version,
    enableColors: true,
  })

  application.register(Builtins.HelpCommand)
  application.register(Builtins.DefinitionsCommand)
  application.register(Builtins.VersionCommand)

  application.register(BuildCommand);
  application.register(CleanCommand);
  application.register(DevCommand);
  application.register(DoctorCommand);
  application.register(InstallCommand)

  application.runExit(argv, context)
}

/* ⚡️ */
bud()
