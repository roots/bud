#!/usr/bin/env node
// @ts-check

const [node, app, ...args] = process.argv;

(async () => {
  const {Cli} = await import('clipanion');
  const {BuildCommand, CleanCommand, DevCommand, DoctorCommand} = await import('../lib/cjs/cli/index.js');
  
  const cli = new Cli({
    binaryLabel: `bud`,
    binaryName: `bud`,
    binaryVersion: `1.0.0`,
    enableColors: true,
  })

  cli.register(BuildCommand);
  cli.register(CleanCommand);
  cli.register(DevCommand);
  cli.register(DoctorCommand);
  
  cli.runExit(args);
})();
