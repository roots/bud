import {beforeEach, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import {define as defineMethod} from './define.method.js'

describe(`bud.define`, function () {
  let bud: Bud
  let define: defineMethod

  beforeEach(async () => {
    bud = await factory()
    define = defineMethod.bind(bud)
  })

  it(`should be a function`, () => {
    expect(define).toBeInstanceOf(Function)
  })

  it(`should return bud`, () => {
    const returned = define({})
    expect(returned).toBeInstanceOf(Bud)
  })

  it(`adds definitions`, () => {
    define({DEFINED_KEY: `DEFINED_VALUE`})

    expect(
      bud.extensions.get(`webpack:define-plugin`).options.DEFINED_KEY,
    ).toEqual(`DEFINED_VALUE`)
  })
})
