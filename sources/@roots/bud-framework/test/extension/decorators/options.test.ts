import {beforeAll, describe, expect, it, vi} from 'vitest'

import {options} from '../../../src/extension/decorators/options.js'
import {type Bud, Extension} from '../../../src/index.js'

// @ts-ignore
@options({
  foo: `bar`,
})
class TestExtension extends Extension {}

describe(`@roots/bud-framework/extension/decorators/options`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = {
      module: {
        import: vi.fn(async (...args: any[]) => {}),
        resolve: vi.fn(async (...args: any[]) => {}),
      },
      resolvePromises: vi.fn(async (...args: any[]) => {}),
    } as unknown as Bud
  })

  it(`should return a decorator`, () => {
    // @ts-ignore
    expect(options({foo: `bar`})).toBeInstanceOf(Function)
  })

  it(`should add a _options property to the class`, () => {
    // @ts-ignore
    expect(new TestExtension(bud)._options).toEqual({foo: `bar`})
  })

  it(`should add a options property to the class`, () => {
    // @ts-ignore
    expect(new TestExtension(bud).options).toEqual({foo: `bar`})
  })
})
