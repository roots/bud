import {describe, expect, it} from '@jest/globals'

import {define as defineMethod} from './index.js'

describe(`bud.define`, () => {
  it(`should be a function`, async () => {
    expect(defineMethod).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async pkg => await pkg.factory(),
    )
    const define = defineMethod.bind(bud)

    const returned = define({})
    expect(returned).toBe(bud)
  })

  it(`adds definitions`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async pkg => await pkg.factory(),
    )
    const define = defineMethod.bind(bud)
    define({DEFINED_KEY: `DEFINED_VALUE`})
  })
})
