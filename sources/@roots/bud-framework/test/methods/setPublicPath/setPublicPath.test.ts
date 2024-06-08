import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {setPublicPath as subject} from '../../../src/methods/setPublicPath'

describe(`@roots/bud-framework/methods/setPublicPath`, () => {
  let bud: Bud
  let setPublicPath: subject

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    setPublicPath = subject.bind(bud)
  })

  it(`should be a function`, () => {
    expect(setPublicPath).toBeInstanceOf(Function)
  })

  it(`should return Bud`, () => {
    expect(setPublicPath(``)).toBe(bud)
  })

  it(`should set publicPath with a string`, () => {
    const hooksOnSpy = vi.spyOn(bud.hooks, `on`)
    const publicPath = `/foo`
    setPublicPath(publicPath)
    expect(hooksOnSpy).toHaveBeenCalledWith(
      `build.output.publicPath`,
      `/foo/`,
    )
  })

  it(`should set publicPath with a function`, () => {
    const hooksOnSpy = vi.spyOn(bud.hooks, `on`)
    const publicPathSetter = vi.fn(() => `/bar`)

    setPublicPath(publicPathSetter)
    expect(hooksOnSpy).toHaveBeenCalledWith(
      `build.output.publicPath`,
      publicPathSetter,
    )
  })
})
