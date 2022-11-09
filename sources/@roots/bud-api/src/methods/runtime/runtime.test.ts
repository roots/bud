import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {runtime} from './index.js'

describe(`bud.splitChunks`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await factory()
    subject = runtime.bind(bud)
  })

  it(`should be a function`, () => {
    expect(subject).toBeInstanceOf(Function)
  })

  it(`should pass custom runtime object`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    subject({name: `test`})

    expect(onSpy).toHaveBeenCalledWith(`build.optimization.runtimeChunk`, {
      name: `test`,
    })
  })

  it(`should pass custom a runtime string`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    subject(`single`)

    expect(onSpy).toHaveBeenCalledWith(
      `build.optimization.runtimeChunk`,
      `single`,
    )
  })

  it(`should disable runtimeChunk when passed a boolean false`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    subject(false)

    expect(onSpy).toHaveBeenCalledWith(
      `build.optimization.runtimeChunk`,
      false,
    )
  })
})
