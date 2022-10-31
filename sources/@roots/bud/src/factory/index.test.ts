import {Bud} from '@roots/bud-framework'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {describe, expect, test} from 'vitest'

import {factory} from './index'

describe(`@roots/bud/factory`, () => {
  test(`should return bud`, async () => {
    const bud = await factory()
    expect(bud).toBeInstanceOf(Bud)
  })

  test(`should merge overrides`, async () => {
    const bud = await factory({
      basedir: dirname(fileURLToPath(import.meta.url)),
    })
    expect(bud.context.basedir).toEqual(
      dirname(fileURLToPath(import.meta.url)),
    )
  })
})
