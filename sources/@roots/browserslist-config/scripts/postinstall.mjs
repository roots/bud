// @ts-check

/* eslint-disable n/no-process-env */
/* eslint-disable n/no-process-exit */

import {execaCommandSync} from 'execa'

if (!process.env.CI) {
  try {
    execaCommandSync(`npx browserslist --update-db`, {
      cwd: process.env.INIT_CWD ?? process.cwd(),
      reject: false,
      timeout: 10000,
    })
  } catch (e) {}
}

export {}
