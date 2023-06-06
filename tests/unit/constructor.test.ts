import {factory} from '@repo/test-kit'
import {describe, expect, it} from 'vitest'

describe(`bud`, () => {
  it(`name options`, async () => {
    const bud = await factory({label: `foo`})
    expect(bud.label).toBe(`foo`)
  })
})
