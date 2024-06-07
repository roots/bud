import {describe, expect, it} from 'vitest'

import flag from '../../src/cli/flags/entrypoints.html'

describe(`@roots/bud/cli/flags/entrypoints.html`, () => {
  it(`should match snapshot`, () => {
    expect(flag).toMatchInlineSnapshot(`
      {
        "definition": [Function],
        "transformer": [Function],
        Symbol(clipanion/isOption): true,
      }
    `)
  })
})
