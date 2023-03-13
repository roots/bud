/* eslint-disable no-console */
// @ts-check

import {writeFileSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const logErr = path => {
  process.stderr.write(
    [
      `📦  @roots/bud-framework`,
      `  ⚠️  Failed to grant execution permissions to roots-notifier`,
      `  Please run the following command manually:`,
      `    chmod u+x ${path}`,
    ].join(`\n\n`),
  )
}

const cwd = resolve(dirname(fileURLToPath(import.meta.url)), `..`)

const notifierPath = join(
  cwd,
  `vendor`,
  `mac.no-index`,
  `roots-notifier.app`,
  `Contents`,
  `MacOS`,
  `roots-notifier`,
)

try {
  if (process.platform === `darwin`) {
    const {execaCommand: $} = await import(`execa`)

    const results = await $(`chmod u+x ${notifierPath}`, {
      cwd,
      reject: false,
      timeout: 10000,
    })

    if (results.exitCode !== 0) {
      writeFileSync(
        join(cwd, `install.stderr.log`),
        results.stderr,
        `utf8`,
      )
    } else {
      logErr(notifierPath)
    }
  }
} catch (e) {
  logErr(notifierPath)
}

export {}
