#!/usr/bin/env node

const execa = require('execa')

const registry = 'http://0.0.0.0:4873'
const commands = {
  authToToken: [
    'npm-auth-to-token',
    [
      '-u',
      'test',
      '-p',
      'test',
      '-e',
      'test@test.com',
      '-r',
      registry,
    ],
  ],
  setRegistry: ['npm', ['set', 'registry', registry]],
  publish: ['npm', ['--registry', registry, 'publish']],
}

const $ = async (...command) => {
  const run = execa(...command)
  run.stdout.pipe(process.stdout)
  run.stderr.pipe(process.stderr)
  await run
}

async function main() {
  await $(...commands.authToToken)
  await $(...commands.setRegistry)
  await $(...commands.publish)
}

main().catch(console.error)
