import {describe, expect, it, jest} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'

import Extension from './index'

describe(`@roots/bud-cache/inalidate-cache-extension`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })

  it(`should be an extension`, async () => {
    const bud = await factory()
    expect(
      new Extension(
        // @ts-ignore
        bud,
      ),
    ).toHaveProperty(`label`, `@roots/bud-cache/invalidate-cache`)
  })

  it(`should have an error file accessor`, async () => {
    const bud = await factory()
    const extension = new Extension(
      // @ts-ignore
      bud,
    )

    expect(extension.file).toStrictEqual(
      expect.stringContaining(`${bud.label}/production.error.json`),
    )
  })

  it(`should check if error file exists`, async () => {
    const bud = await factory()

    const extension = new Extension(
      // @ts-ignore
      bud,
    )
    // @ts-ignore
    extension.app.fs.exists = jest.fn(() => false)
    await extension.register()

    expect(extension.app.fs.exists).toHaveBeenCalled()
  })

  it(`should call remove when bud.fs.exists returns false`, async () => {
    const bud = await factory()
    // @ts-ignore
    bud.fs.exists = jest.fn(() => true)
    // @ts-ignore
    const removeSpy = jest.spyOn(bud.fs, `remove`)

    const extension = new Extension(
      // @ts-ignore
      bud,
    )
    await extension.register()

    expect(removeSpy).toHaveBeenCalled()
  })

  it(`should call bud.hooks.action`, async () => {
    const bud = await factory()
    // @ts-ignore
    bud.fs.exists = jest.fn(() => true)
    const hookSpy = jest.spyOn(bud.hooks, `action`)

    const extension = new Extension(
      // @ts-ignore
      bud,
    )
    await extension.register()

    expect(hookSpy).toHaveBeenCalled()
  })
})
