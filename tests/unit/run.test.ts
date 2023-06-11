import {Bud, factory} from '@repo/test-kit'
import {run} from '@roots/bud-framework/methods/run'
import {describe, expect, it} from 'vitest'

describe(`bud.run`, () => {
  let bud: Bud

  it(`is a function`, async () => {
    bud = await factory()
    expect(JSON.stringify(run)).toEqual(JSON.stringify(bud.run))
  })
})
