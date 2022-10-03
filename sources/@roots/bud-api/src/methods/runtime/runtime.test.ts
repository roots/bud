import {describe, expect, it, jest} from '@jest/globals'
import mockBud from '@repo/test-kit/mocks/bud'

import {runtime} from './index'

jest.unstable_mockModule(`@roots/bud`, () => ({default: mockBud}))

describe(`bud.splitChunks`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    subject = runtime.bind(bud)
  })

  it(`should be a function`, () => {
    expect(subject).toBeInstanceOf(Function)
  })

  it(`should pass custom runtime object`, () => {
    subject({name: `test`})

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.optimization.runtimeChunk`,
      {name: `test`},
    )
  })

  it(`should pass custom a runtime string`, () => {
    subject(`single`)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.optimization.runtimeChunk`,
      `single`,
    )
  })

  it(`should disable runtimeChunk when passed a boolean false`, () => {
    subject(false)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.optimization.runtimeChunk`,
      false,
    )
  })
})
