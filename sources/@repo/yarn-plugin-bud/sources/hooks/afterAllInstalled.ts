/* eslint-disable n/no-process-env */
import {execute} from '@yarnpkg/shell'

export default async () => {
  await execute(
    `yarn`,
    [`@bud`, `plugin`, `rebuild`],
  )
  await execute(
    `yarn`,
    [`@bud`, `registry`, `start`],
  )

  if (!process.env.ci) {
    await execute(
      `yarn`,
      [
        `workspace`,
        `@roots/browserslist-config`,
        `exec`,
        `node`,
        `./scripts/postinstall.mjs`,
      ],
      {stderr: process.stderr},
    )
  }

  await execute(`yarn`, [`@bud`, `build`, `--force`], {
    stderr: process.stderr,
  })
}
