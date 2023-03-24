import {describe, expect, it, vi} from 'vitest'

import Extension from '../src/invalidate-cache/index.js'

describe(`@roots/bud-cache/invalidate-cache-extension`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })

  it(`should be an extension`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async pkg => await pkg.factory(),
    )

    expect(new Extension(bud)).toHaveProperty(
      `label`,
      `@roots/bud-cache/invalidate-cache`,
    )
  })

  it(`should have an error file accessor`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async pkg => await pkg.factory(),
    )
    const extension = new Extension(bud)

    expect(extension.invalidationFile).toStrictEqual(
      expect.stringContaining(`${bud.label}/cache/error.json`),
    )
  })

  it(`should check if error file exists`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async pkg => await pkg.factory(),
    )

    const extension = new Extension(bud)
    // @ts-ignore
    extension.app.fs.exists = vi.fn(() => false)
    await extension.register(bud)

    expect(extension.app.fs.exists).toHaveBeenCalled()
  })

  it(`should call remove when bud.fs.exists returns false`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async pkg => await pkg.factory(),
    )
    // @ts-ignore
    bud.fs.exists = vi.fn(() => true)
    // @ts-ignore
    const removeSpy = vi.spyOn(bud.fs, `remove`)

    const extension = new Extension(bud)
    await extension.register(bud)

    expect(removeSpy).toHaveBeenCalled()
  })

  it(`should call bud.hooks.action`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async pkg => await pkg.factory(),
    )

    // @ts-ignore
    bud.fs.exists = vi.fn(() => true)
    const hookSpy = vi.spyOn(bud.hooks, `action`)

    const extension = new Extension(bud)
    await extension.register(bud)

    expect(hookSpy).toHaveBeenCalled()
  })
})
