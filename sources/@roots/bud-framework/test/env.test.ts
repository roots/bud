import {factory} from '@repo/test-kit'
import {Bud} from '@roots/bud'
import Env from '@roots/bud-framework/env'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`@roots/bud/services/env`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = (await factory()) as Bud
  })

  it(`is a container service`, async () => {
    const bud = await factory()
    const instance = new Env(() => bud)
    expect(instance.constructor.name).toBe(`Env`)
  })
})
