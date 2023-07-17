import {type Bud, factory} from '@repo/test-kit'
import {bindFacade as subject} from '@roots/bud-framework/methods/bindFacade'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`bud.bindFacade`, function () {
  let bindFacade: subject
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    bindFacade = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(bindFacade).toBeInstanceOf(Function)
  })

  it(`throws when passed something other than a function`, () => {
    expect(() => bindFacade(`assets`, 6)).toThrowError()
  })

  it(`returns bud`, () => {
    expect(bindFacade(`assets`, () => {})).toBe(bud)
  })
})
