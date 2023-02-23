import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it} from 'vitest'

import {define as defineMethod} from '../src/methods/define/index.js'

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
    expect(returned).toBe(bud)
  })

  it(`adds definitions`, () => {
    define({DEFINED_KEY: `DEFINED_VALUE`})

    expect(
      bud.extensions.get(`@roots/bud-extensions/webpack-define-plugin`)
        .get(`DEFINED_KEY`),
    ).toEqual(`DEFINED_VALUE`)
  })
})
