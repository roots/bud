import execa, {ExecaReturnValue} from '@roots/bud-support/execa'
import {getPort} from '@roots/bud-support/get-port'

import * as fs from './copy.js'

export const e2eBeforeAll = async (dirname: string) => {
  await fs.copyDir(dirname)
  await fs.overwriteJson(dirname)

  await execa(`npm`, [`install`, `--registry`, `http://localhost:4873`], {
    cwd: fs.destinationPath(dirname),
    env: {NODE_ENV: `development`},
  }).catch(error => {
    throw error
  })

  return await getPort({
    port: [
      3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010,
    ],
  })
}

export const runDev = async (
  dirname: string,
  port: number,
): Promise<ExecaReturnValue> => {
  await fs.copyOriginalSource(dirname).catch(error => {
    throw error
  })

  return execa(
    `npx`,
    [
      `bud`,
      `dev`,
      `--no-cache`,
      `--html`,
      `--port`,
      `${port}`,
    ],
    {cwd: fs.destinationPath(dirname)},
  ).catch(error => {
    throw error
  })
}
