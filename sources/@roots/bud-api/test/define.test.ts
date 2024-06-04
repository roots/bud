import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it} from 'vitest'

import {define as defineMethod} from '../src/methods/define'

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

    const {options} = bud.extensions.get(
      `@roots/bud-extensions/webpack-define-plugin`,
    )

    expect(options.DEFINED_KEY).toEqual(`DEFINED_VALUE`)
  })

  it(`adds PUBLIC_APP_TITLE from env`, async () => {
    await bud.extensions.make()

    const {options} = bud.extensions.get(
      `@roots/bud-extensions/webpack-define-plugin`,
    )

    expect(options.APP_TITLE).toBeDefined()
  })

  it(`matches snapshot`, () => {
    const {options} = bud.extensions.get(
      `@roots/bud-extensions/webpack-define-plugin`,
    )

    expect(options).toMatchSnapshot()
  })
})
