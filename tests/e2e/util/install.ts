import execa, {ExecaReturnValue} from '@roots/bud-support/execa'
import getPort from '@roots/bud-support/get-port'

import * as fs from './copy'

export const e2eBeforeAll = async (dirname: string) => {
  await fs.copyDir(dirname)

  try {
    await execa(
      `npm`,
      [`install`, `--registry`, `http://localhost:4873`],
      {
        cwd: fs.testPath(dirname),
        env: {NODE_ENV: `development`},
      },
    )
  } catch (error) {
    throw error
  }

  return await getPort()
}

export const runDev = async (
  dirname: string,
  port: number,
): Promise<ExecaReturnValue> => {
  try {
    await fs.copyOriginalSource(dirname)
  } catch (error) {
    throw error
  }

  try {
    return execa(
      `npx`,
      [`bud`, `dev`, `--no-cache`, `--html`, `--port`, `${port}`],
      {cwd: fs.testPath(dirname)},
    )
  } catch (error) {
    throw error
  }
}
