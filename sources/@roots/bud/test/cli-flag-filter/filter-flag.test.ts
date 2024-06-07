import {Option} from '@roots/bud-support/clipanion'
import {describe, expect, it} from 'vitest'

import filter from '../../src/cli/flags/filter/index'

describe(`@roots/bud/cli/flags/filter`, () => {
  it(`should match snapshot`, () => {
    expect(filter).toMatchInlineSnapshot(`
      {
        "definition": [Function],
        "transformer": [Function],
        Symbol(clipanion/isOption): true,
      }
    `)
  })
})
