import {execute} from '@yarnpkg/shell'

export default async () => {
  await execute('yarn', ['@bud', 'registry', 'install'], {
    stdin: process.stdin,
    stdout: process.stdout,
  })

  await execute('yarn', ['@bud', 'info'], {
    stdin: process.stdin,
    stdout: process.stdout,
  })
}
