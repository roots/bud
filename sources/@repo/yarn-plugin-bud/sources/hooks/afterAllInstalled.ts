import {execute} from '@yarnpkg/shell'

export default async () => {
  await execute(
    `yarn`,
    [`@bud`, `run`, `--`, `registry install`, `--`, `build`],
    {
      stdin: process.stdin,
      stdout: process.stdout,
    },
  )
}
