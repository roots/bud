import {join} from 'node:path'

import {path} from '@repo/constants'
import {factory} from '@roots/bud/factory'
import {describe, expect, test} from 'vitest'

describe(`@roots/bud/factory`, () => {
  test(`should merge overrides`, async () => {
    const bud = await factory({
      basedir: join(path(`tests`), `util`, `project`),
      dry: true,
      log: false,
    })

    expect(bud.label).toBe(`@tests/project`)
  })
})
