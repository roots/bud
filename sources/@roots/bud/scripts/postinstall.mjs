// @ts-check

/* eslint-disable n/no-process-env */
/* eslint-disable n/no-process-exit */

import {platform} from 'node:os'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {execaCommandSync} from 'execa'

if (process.env.npm_package_version === `0.0.0`) {
  process.exit(0)
}

execaCommandSync(`npx browserslist --update-db`, {
  cwd: process.env.INIT_CWD ?? process.cwd(),
  reject: false,
  timeout: 10000,
})

if (platform() === `darwin`) {
  const notifierPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    `..`,
    `vendor`,
    `mac.no-index`,
    `roots-notifier.app`,
    `Contents`,
    `MacOS`,
    `roots-notifier`,
  )

  execaCommandSync(`chmod u+x ${notifierPath}`)
}

process.exit(0)

export {}
