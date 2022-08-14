import {paths} from '@repo/constants'
import {logger} from '@repo/logger'
import {execa} from 'execa'
import {join} from 'path'

const options = (designator: string) => ({
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

  const install = execa(
    'yarn',
    ['install', '--registry', 'http://localhost:4873'],
    options(designator),
  )

  install.stdout?.on('data', data => {
    logger.log(data.toString())
  })

  await install
}

export default install
