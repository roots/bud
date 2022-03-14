#!/usr/bin/env node

const {Cli, Builtins} = require('clipanion')
const {BuildCommand, CleanCommand, DevCommand, DoctorCommand, InstallCommand} = require('../lib/cjs/cli/index.js')
const {makeContext} = require('../lib/cjs/context/index.js')

/**
 * Run Bud CLI
 * @public
 */
const runBudCLI = async () => {
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
   * CLI instantiation
   *
   * @see {@link https://mael.dev/clipanion/docs/api/cli}
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
runBudCLI()
