import {execute} from '@yarnpkg/shell'

export default async () => {
  try {
    await execute(`yarn`, [`@bud`, `registry`, `install`], {
      stdin: process.stdin,
      stdout: process.stdout,
    })
  } catch (e) {
    e.name = `@bud registry install: ${e.name}`
    throw e
  }

  try {
    await execute(
      `yarn`,
      [`workspace`, `@repo/yarn-plugin-bud`, `build`],
      {
        stdin: process.stdin,
        stdout: process.stdout,
      },
    )
  } catch (e) {
    e.name = `@bud cli build: ${e.name}`
    throw e
  }

  try {
    process.stdout.write(`Rolling up bud dependencies...`)
    await execute(`yarn`, [
      `rollup`,
      `--config`,
      `config/rollup/rollup.config.js`,
    ])
  } catch (e) {
    e.name = `rollup error: ${e.name}`
    throw e
  }

  try {
    await execute(
      `yarn`,
      [
        `workspace`,
        `@roots/browserslist-config`,
        `exec`,
        `node`,
        `./scripts/postinstall.mjs`,
      ],
      {
        stdin: process.stdin,
        stdout: process.stdout,
      },
    )
  } catch (e) {
    e.name = `@roots/browserslist-config postinstall error: ${e.name}`
    throw e
  }

  try {
    await execute(`yarn`, [`@bud`, `build`, `--force`], {
      stdin: process.stdin,
      stdout: process.stdout,
    })
  } catch (e) {
    e.name = `@bud build error: ${e.name}`
    throw e
  }
}
