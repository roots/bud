/* eslint-disable n/no-process-env */
/* eslint-disable no-console */
// @ts-check

import {writeFileSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {execaCommandSync} from 'execa'

try {
  if (process.platform === `darwin` && !process.env.CI) {
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
      writeFileSync(
        join(cwd, `install.stderr.log`),
        results.stderr,
        `utf8`,
      )
    }
  }
} catch (e) {}

export {}
