import {join} from 'node:path'

import {paths} from '@repo/constants'
import {describe, expect, test} from 'vitest'

import {factory} from './factory.js'

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
