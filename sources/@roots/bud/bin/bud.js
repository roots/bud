#!/usr/bin/env node
// @ts-check

const {Cli, Builtins} = require('clipanion');
const {BuildCommand, CleanCommand, DevCommand, DoctorCommand, InstallCommand} = require('../lib/cjs/cli/index.js');
const { fs } = require('@roots/bud-support')

const args = process.argv.splice(2);

(async () => {
  const manifest = await fs.readJson(`${__dirname}/../package.json`)
  const name = manifest.name.split('/').pop()

  const cli = new Cli({
    binaryLabel: name,
    binaryName: name,
    binaryVersion:manifest.version,
    enableColors: true,
  })

  cli.register(Builtins.HelpCommand)
  cli.register(Builtins.DefinitionsCommand)
  cli.register(Builtins.VersionCommand)
  cli.register(BuildCommand);
  cli.register(CleanCommand);
  cli.register(DevCommand);
  cli.register(DoctorCommand);
  cli.register(InstallCommand)

  cli.run(args);
})();
