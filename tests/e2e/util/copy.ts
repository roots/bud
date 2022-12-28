import {paths} from '@repo/constants'
import {logger} from '@repo/logger'
import fs from 'fs-extra'
import {join} from 'path'

export const example = async (designator: string) => {
  try {
    logger.log(`copying @examples/${designator}`)

    await fs.remove(
      join(
        paths.root,
        `storage`,
        `mocks`,
        `yarn`,
        `@examples`,
        designator,
      ),
    )

    await fs.copy(
      join(paths.root, `examples`, designator),
      join(
        paths.root,
        `storage`,
        `mocks`,
        `yarn`,
        `@examples`,
        designator,
      ),
      {
        overwrite: true,
        recursive: true,
      },
    )

    const file = await fs.readFile(
      join(paths.sources, `@repo`, `test-kit`, `.yarnrc.stub.yml`),
      `utf8`,
    )

    await fs.outputFile(
      join(
        paths.root,
        `storage`,
        `mocks`,
        `yarn`,
        `@examples`,
        designator,
        `.yarnrc.yml`,
      ),
      file,
    )

    return
  } catch (error) {
    return
  }
}

export const source = async (designator: string) => {
  try {
    await fs.remove(
      join(
        paths.root,
        `storage`,
        `mocks`,
        `yarn`,
        `@examples`,
        designator,
        `src`,
      ),
    )

    await fs.copy(
      join(paths.root, `examples`, designator, `src`),
      join(
        paths.root,
        `storage`,
        `mocks`,
        `yarn`,
        `@examples`,
        designator,
        `src`,
      ),
      {
        overwrite: true,
        recursive: true,
      },
    )
  } catch (error) {
    throw error
  }
}
