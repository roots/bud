// @ts-check

/* eslint-disable no-console */
/* eslint-disable n/no-process-env */
/* eslint-disable n/no-process-exit */

import {execaCommandSync} from 'execa'

const isDevelopment = process.env.npm_package_version === `0.0.0`
const exit = () => process.exit(0)

if (isDevelopment) exit()

try {
  execaCommandSync(`npx browserslist --update-db`, {
    cwd: process.env.INIT_CWD ?? process.cwd(),
    reject: false,
    timeout: 10000,
  })
} catch (e) {
  // fallthrough
}

exit()
