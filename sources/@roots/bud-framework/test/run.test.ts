import {Bud, factory} from '@repo/test-kit/bud'
import {run} from '@roots/bud-framework/methods/run'
import {describe, expect, it, vi} from 'vitest'

describe(`bud.run`, function () {
  let bud: Bud

  it(`is a function`, async () => {
    bud = await factory()
    expect(JSON.stringify(run)).toEqual(JSON.stringify(bud.run))
  })
})
