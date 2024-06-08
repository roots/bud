import {type Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it} from 'vitest'

import {bindFacade as subject} from '../../../src/methods/bindFacade/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    getLabel: (this: Bud) => string
  }
}

describe(`bud.bindFacade`, function () {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`is a function`, () => {
    expect(subject.bind(bud)).toBeInstanceOf(Function)
  })

  it(`throws when passed something other than a function`, () => {
    expect(() => subject.bind(bud)(`assets`, 6)).toThrowError()
  })

  it(`returns bud`, () => {
    expect(subject.bind(bud)(`assets`, () => {})).toBe(bud)
  })
})
