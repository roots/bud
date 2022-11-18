import {describe, expect, it} from 'vitest'

import {BudImageminExtension} from './extension.js'

describe(`@roots/bud-imagemin`, () => {
  it(`should be constructable`, () => {
    expect(BudImageminExtension).toBeInstanceOf(Function)
  })
})
