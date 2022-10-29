import {describe, expect, it, jest} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import extensionConstructor from './index'

describe(`bud-esm`, () => {
  it(`is constructable`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  it(`should be an instance of extension`, async () => {
    let bud: Bud = await factory()

    expect(new extensionConstructor(bud)).toBeInstanceOf(
      extensionConstructor,
    )

    expect(new extensionConstructor(bud).buildBefore).not.toBe(
      bud.extensions.get(`@roots/bud-extensions/bud-esm`).buildBefore,
    )
  })

  it(`should be exposed via bud.esm`, async () => {
    let bud = await factory()
    bud.extensions.add(`@roots/bud-extensions/bud-esm`)
    expect(bud.esm).toBeDefined()
  })

  it(`should be labeled esm`, async () => {
    let bud = await factory()
    const instance = new extensionConstructor(bud)
    expect(instance.label).toBe(`@roots/bud-extensions/bud-esm`)
  })

  it(`should be disabled by default`, async () => {
    let bud = await factory()
    let instance = new extensionConstructor(bud)
    expect(await instance.isEnabled()).toBe(false)
  })

  it(`should be enable-able`, async () => {
    let bud = await factory()
    let instance = new extensionConstructor(bud)
    instance.enable()
    expect(await instance.isEnabled()).toBe(true)
  })

  it(`should be callable when enabled using extensions api`, async () => {
    let bud = await factory()
    bud.extensions.add(extensionConstructor)
    const extensionInstance = bud.extensions.get(
      `@roots/bud-extensions/bud-esm`,
    )

    extensionInstance.enable()
    expect(await extensionInstance.isEnabled()).toBe(true)
  })

  it(`should call hooks from buildBefore`, async () => {
    let bud = await factory()

    let instance = new extensionConstructor(bud)

    instance.enable()
    await instance.buildBefore(bud)

    expect(bud.hooks.filter(`build.experiments`)).toEqual({
      outputModule: true,
    })
    expect(bud.hooks.filter(`build.output.module`)).toEqual(true)
  })

  it(`should call externals when imports is defined in package.json`, async () => {
    let bud = await factory()
    bud.context.manifest = {
      imports: {
        react: `React`,
      },
    }

    const hooksSpy = jest.spyOn(
      bud.hooks,
      // @ts-ignore
      `on`,
    )

    let instance = new extensionConstructor(bud)

    instance.enable()
    await instance.buildBefore(bud)

    expect(hooksSpy).toHaveBeenCalled()
  })

  it(`should not call externals when imports is undefined in package.json`, async () => {
    let bud = await factory()
    bud.context.manifest = {
      imports: undefined,
    }

    const hooksSpy = jest.spyOn(
      bud.hooks,
      // @ts-ignore
      `on`,
    )

    let instance = new extensionConstructor(bud)

    instance.enable()
    await instance.buildBefore(
      //@ts-ignore
      bud,
    )

    expect(hooksSpy).not.toHaveBeenCalled()
  })
})
