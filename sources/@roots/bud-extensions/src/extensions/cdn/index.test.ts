import {factory} from '@repo/test-kit/bud'
import {Bud} from '@roots/bud-framework'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import source from './index.js'

describe(`@roots/bud-extensions/cdn`, () => {
  let bud: Bud
  let cdn: source

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    cdn = new source(bud)
  })

  it(`should be an instance of Extension`, async () => {
    expect(cdn).toBeInstanceOf(source)
  })

  it(`should set cacheEnabled to false when disableCache is called`, async () => {
    cdn.disableCache()
    expect(cdn.cacheEnabled).toBe(false)
  })

  it(`should set lockfileLocation when setLockFileLocation is called`, async () => {
    cdn.setLockfileLocation(`foo`)
    expect(cdn.options.lockfileLocation).toBe(`foo`)
  })

  it(`should set cacheLocation when setCacheLocation is called`, async () => {
    cdn.setCacheLocation(`foo`)
    expect(cdn.options.cacheLocation).toBe(`foo`)
  })

  it(`should call hooks.on from buildBefore`, async () => {
    const bud = await factory()
    const onSpy = vi.spyOn(bud.hooks, `on`)

    const cdn = new source(bud)
    await cdn.buildBefore(bud)

    expect(onSpy).toHaveBeenCalled()
  })

  it(`should call extensions.add from buildBefore`, async () => {
    const bud = await factory()
    const extAddSpy = vi.spyOn(bud.extensions, `add`)

    const cdn = new source(bud)
    await cdn.buildBefore(bud)

    expect(extAddSpy).toHaveBeenCalled()
  })
})
