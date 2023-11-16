import {join} from 'node:path'

import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`--filter`, () => {
  beforeAll(async () => {
    await fs.removeAsync(
      path(
        `sources/@roots/bud/test/cli-flag-filter/project/project-a/dist`,
      ),
    )
    await fs.removeAsync(
      path(`sources/@roots/bud/test/cli-flag-filter/project/.budfiles`),
    )
    await fs.removeAsync(
      path(
        `sources/@roots/bud/test/cli-flag-filter/project/project-b/dist`,
      ),
    )

    await execa(`yarn`, [
      `workspace`,
      `@tests/bud-filter-flag`,
      `run`,
      `bud`,
      `build`,
      `--filter`,
      `project-b`,
    ])
  })

  it(`includes project-b`, async () => {
    expect(
      await fs.existsAsync(
        path(
          `sources/@roots/bud/test/cli-flag-filter/project/project-b/dist`,
        ),
      ),
    ).toBeTruthy()
  })

  it(`excludes project-a`, async () => {
    expect(
      await fs.existsAsync(
        path(
          `sources/@roots/bud/test/cli-flag-filter/project/project-a/dist`,
        ),
      ),
    ).toBeFalsy()
  })
})
