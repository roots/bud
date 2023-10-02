// @ts-check

/* eslint-disable n/no-process-env */
/* eslint-disable n/no-process-exit */

import {execa} from 'execa'

if (!process.env.CI) {
  await execa(`npx browserslist --update-db`, {
    cwd: process.env.INIT_CWD ?? process.cwd(),
    reject: false,
    timeout: 10000,
  }).catch(e => {
    console.log(e.message ?? e)
  })
}

export {}
