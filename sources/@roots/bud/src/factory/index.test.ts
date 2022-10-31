import {describe, expect, test} from '@jest/globals'
import {paths} from '@repo/constants'
import {join} from 'path'

import {factory} from './index.js'

describe(`@roots/bud/factory`, () => {
  test(`should merge overrides`, async () => {
    const bud = await factory({
      basedir: join(paths.tests, `util`, `project`),
      args: {
        dry: true,
        log: false,
      },
    })
    expect(bud.label).toBe(`@tests/project`)
  })
})
