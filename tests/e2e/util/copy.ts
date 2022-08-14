import {paths} from '@repo/constants'
import {logger} from '@repo/logger'
import fs from 'fs-extra'
import {join} from 'path'

const options = {
  overwrite: true,
  recursive: true,
}

const copy = (designator: string) => async () => {
  logger.log(`copying @examples/${designator}`)

  await fs.remove(
    join(paths.root, 'storage', 'mocks', 'yarn', '@examples', designator),
  )
  await fs.copy(
    join(paths.root, 'examples', designator),
    join(paths.root, 'storage', 'mocks', 'yarn', '@examples', designator),
    options,
  )

  const file = await fs.readFile(
    join(paths.sources, '@repo', 'test-kit', '.yarnrc.stub.yml'),
    'utf8',
  )
  await fs.outputFile(
    join(
      paths.root,
      'storage',
      'mocks',
      'yarn',
      '@examples',
      designator,
      '.yarnrc.yml',
    ),
    file,
  )
}

export default copy
