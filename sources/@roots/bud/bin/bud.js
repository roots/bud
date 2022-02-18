#!/usr/bin/env node
// @ts-check

const {Cli} = require('clipanion');
const {BuildCommand, CleanCommand, DevCommand, DoctorCommand} = require('../lib/cjs/cli/index.js');
const { fs } = require('@roots/bud-support')

const [node, app, ...args] = process.argv;

(async () => {
  const manifest = await fs.readJson(`${__dirname}/../package.json`)
  const name = manifest.name.split('/').pop()

  const cli = new Cli({
    binaryLabel: name,
    binaryName: name,
    binaryVersion:manifest.version,
    enableColors: true,
  })

  cli.register(BuildCommand);
  cli.register(CleanCommand);
  cli.register(DevCommand);
  cli.register(DoctorCommand);

  cli.runExit(args);
})();
