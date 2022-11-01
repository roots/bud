import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`bud.minimize`, function () {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`is a function`, () => {
    expect(bud.minimize).toBeInstanceOf(Function)
  })

  it(`enables minimizing when called`, async () => {
    bud.minimize()
    await bud.api.processQueue()

    expect(bud.hooks.filter(`build.optimization.minimize`)).toEqual(true)
  })

  it(`disables minimizing when false is passed as param`, async () => {
    bud.minimize(false)

    await bud.api.processQueue()

    expect(bud.hooks.filter(`build.optimization.minimize`)).toEqual(false)
  })
})
