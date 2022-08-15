import {paths} from '@repo/constants'
import {logger} from '@repo/logger'
import {execa, ExecaChildProcess, Options} from 'execa'
import {join} from 'path'

const options = (designator: string): Options => ({
  cwd: join(
    paths.root,
    'storage',
    'mocks',
    'yarn',
    '@examples',
    designator,
  ),
})

const install = (designator: string) => async () => {
  logger.log(`installing @examples/${designator}`)

  const child: ExecaChildProcess = execa(
    'yarn',
    ['install', '--registry', 'http://localhost:4873'],
    options(designator),
  )
  child.stdout?.pipe(process.stdout)
  return await child
}

export default install
