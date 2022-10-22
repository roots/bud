import {describe, expect, it, jest} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'
import {Extension} from '@roots/bud-framework/extension'

import extensionConstructor from './index'

describe(`bud-esm`, () => {
  it(`is constructable`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  it(`should be an instance of extension`, async () => {
    let bud = await factory()
    expect(new extensionConstructor(bud)).toBeInstanceOf(Extension)
  })

  it(`should be exposed via bud.esm`, async () => {
    let bud = await factory()
    new extensionConstructor(bud)
    expect(bud.esm).toBeInstanceOf(Extension)
  })

  it(`should be labeled esm`, async () => {
    let bud = await factory()
    const instance = new extensionConstructor(
      // @ts-ignore
      bud,
    )
    expect(instance.label).toBe(`esm`)
  })

  it(`should have a when fn`, async () => {
    let bud = await factory()
    let instance = new extensionConstructor(bud)
    expect(instance.when).toBeInstanceOf(Function)
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
    const extensionInstance = bud.extensions.get(`esm`)

    expect(extensionInstance.when).toBeInstanceOf(Function)

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

    const externalsSpy = jest.spyOn(
      bud,
      // @ts-ignore
      `externals`,
    )

    let instance = new extensionConstructor(bud)

    instance.enable()
    await instance.buildBefore(
      //@ts-ignore
      bud,
    )

    expect(externalsSpy).toHaveBeenCalled()
  })

  it(`should not call externals when imports is undefined in package.json`, async () => {
    let bud = await factory()
    bud.context.manifest = {
      imports: undefined,
    }

    const externalsSpy = jest.spyOn(
      bud,
      // @ts-ignore
      `externals`,
    )

    let instance = new extensionConstructor(bud)

    instance.enable()
    await instance.buildBefore(
      //@ts-ignore
      bud,
    )

    expect(externalsSpy).not.toHaveBeenCalled()
  })
})
