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
    )
  } catch (e) {
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
