/* eslint-disable no-console */
// @ts-check

/* eslint-disable n/no-process-env */
/* eslint-disable n/no-process-exit */

import {writeFileSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {execaCommandSync} from 'execa'

console.log(`[bud-framework] platform:`, process.platform)

if (process.platform === `darwin`) {
  const cwd = resolve(dirname(fileURLToPath(import.meta.url)), `..`)
  console.log(`[bud-framework] cwd:`, cwd)

  const notifierPath = join(
    cwd,
    `vendor`,
    `mac.no-index`,
    `roots-notifier.app`,
    `Contents`,
    `MacOS`,
    `roots-notifier`,
  )
  console.log(`[bud-framework] notifierPath:`, notifierPath)

  const results = execaCommandSync(`chmod u+x ${notifierPath}`, {
    cwd,
    reject: false,
    timeout: 10000,
  })

  if (results.exitCode !== 0) {
    console.log(`[bud-framework] notifier permissions could not be set`)
    writeFileSync(join(cwd, `install.stderr.log`), results.stderr, `utf8`)
  } else {
    console.log(`[bud-framework] notifier permissions set`)
    writeFileSync(join(cwd, `install.stdout.log`), `notifier permissions set`, `utf8`)
  }
}

process.exit(0)

export {}
