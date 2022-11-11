import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import extensionConstructor from './index.js'

describe(`@roots/bud-extensions/cdn`, () => {
  let bud
  let instance
  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    instance = new extensionConstructor(bud)
  })

  it(`should be constructable`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  it(`should be an instance of Extension`, async () => {
    expect(instance).toBeInstanceOf(extensionConstructor)
  })

  it(`should set cacheEnabled to false when disableCache is called`, async () => {
    instance.disableCache()
    expect(instance.cacheEnabled).toBe(false)
  })

  it(`should set lockfileLocation when setLockFileLocation is called`, async () => {
    instance.setLockfileLocation(`foo`)
    expect(instance.lockfileLocation).toBe(`foo`)
  })

  it(`should set cacheLocation when setCacheLocation is called`, async () => {
    instance.setCacheLocation(`foo`)
    expect(instance.cacheLocation).toBe(`foo`)
  })

  it(`should call hooks.on from buildBefore`, async () => {
    const bud = await factory()
    const onSpy = vi.spyOn(bud.hooks, `on`)

    const instance = new extensionConstructor(bud)
    await instance.buildBefore(bud)

    expect(onSpy).toHaveBeenCalled()
  })

  it(`should call extensions.add from buildBefore`, async () => {
    const bud = await factory()
    const extAddSpy = vi.spyOn(bud.extensions, `add`)

    const instance = new extensionConstructor(bud)
    await instance.buildBefore(bud)

    expect(extAddSpy).toHaveBeenCalled()
  })
})
