import {factory} from '@repo/test-kit'
import {Bud} from '@roots/bud-framework'
import {
  beforeAll,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from 'vitest'

import '../src/index.js'
import * as source from '../src/methods/lazy'

describe(`@roots/bud-api/methods/lazy`, () => {
  let bud: any
  let lazy: any
  let calledWith: any

  beforeAll(async () => {
    bud = {
      hooks: {
        on: vi.fn((...params) => {
          calledWith = params
        }),
      },
    }
    lazy = source.lazy.bind(bud)
  })

  it(`should work even if no experiments are set`, async () => {
    lazy()
    expect(calledWith[0]).toEqual(`build.experiments`)
    expect(calledWith[1](null)).toEqual({lazyCompilation: true})
  })

  it(`should merge experiments if they are set`, async () => {
    lazy()
    expect(calledWith[0]).toEqual(`build.experiments`)
    expect(calledWith[1]({foo: `bar`})).toEqual({
      foo: `bar`,
      lazyCompilation: true,
    })
  })

  it(`should return bud`, async () => {
    expect(await lazy()).toBe(bud)
  })
})
