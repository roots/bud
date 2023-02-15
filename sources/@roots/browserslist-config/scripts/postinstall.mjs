// @ts-check

/* eslint-disable n/no-process-env */
/* eslint-disable n/no-process-exit */

import {execaCommandSync} from 'execa'

if (process.env.npm_package_version === `0.0.0`) {
  process.exit(0)
}

execaCommandSync(`npx browserslist --update-db`, {
  cwd: process.env.INIT_CWD ?? process.cwd(),
  reject: false,
  timeout: 10000,
})

process.exit(0)

export {}
