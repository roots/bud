/* eslint-disable no-console */
import {execute} from '@yarnpkg/shell'

export default async () => {
  try {
    await execute(
    `yarn`,
    [`@bud`, `registry`,  `install`],
    {
      stdin: process.stdin,
      stdout: process.stdout,
    },
  )
  } catch (e) {
    console.error(e.message)
  }

  try {
    await execute(
    `yarn`,
    [`@bud`, `registry`,  `start`],
    {
      stdin: process.stdin,
      stdout: process.stdout,
    },
  )
  } catch (e) {
    console.error(e.message)
  }

  await execute(
    `yarn`,
    [`workspace`, `@repo/yarn-plugin-bud`, `build`],
    {
      stdin: process.stdin,
      stdout: process.stdout,
    },
  )

  await execute(
    `yarn`,
    [`workspace`, `@roots/browserslist-config`, `exec`, `node`, `./scripts/postinstall.mjs`],
    {
      stdin: process.stdin,
      stdout: process.stdout,
    },
  )

  await execute(
    `yarn`,
    [`@bud`, `build`,  `--force`],
    {
      stdin: process.stdin,
      stdout: process.stdout,
    },
  )
}
