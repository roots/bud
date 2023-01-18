import { join } from 'node:path'
import {beforeAll, describe, expect, it} from 'vitest'
import fs from '@roots/bud-support/fs-jetpack'
import execa from '@roots/bud-support/execa'
import {paths} from '@repo/constants'

describe(`--filter`, () => {
  beforeAll(async () => {
    await fs.removeAsync(join(paths.root, 'sources/@roots/bud/test/cli-flag-filter/project/project-a/dist'))
    await fs.removeAsync(join(paths.root, 'sources/@roots/bud/test/cli-flag-filter/project/project-b/dist'))
    await execa('yarn', ['workspace', '@tests/bud-filter-flag', 'run', 'bud', 'build', '--filter', 'project-b'])
  })

  it('includes project-b', async () => {
    expect(await fs.existsAsync(join(paths.root, 'sources/@roots/bud/test/cli-flag-filter/project/project-b/dist'))).toBeTruthy()
  })

  it('excludes project-a', async () => {
    expect(await fs.existsAsync(join(paths.root, 'sources/@roots/bud/test/cli-flag-filter/project/project-a/dist'))).toBeFalsy()
  })
})
