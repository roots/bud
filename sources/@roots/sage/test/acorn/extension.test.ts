import {beforeEach, describe, expect, it} from 'vitest'
import {Bud, factory} from '@repo/test-kit'

import Acorn from '../../src/acorn/index.js'

describe(`@roots/sage`, async () => {
  let bud: Bud
  let acorn: Acorn

  beforeEach(async () => {
    bud = await factory()
    acorn = new Acorn(bud)
  })

  it('test bud.sage.acorn.buildBefore', async () => {
    bud.entrypoints.set(`publicPath`, `FOO`)
    bud.manifest.set(`publicPath`, `FOO`)

    let result = await acorn.buildBefore(bud)
    expect(result).toBe(undefined)

    expect(bud.entrypoints.get(`publicPath`)).toBe(``)
    expect(bud.manifest.get(`publicPath`)).toBe(``)
  })
})
