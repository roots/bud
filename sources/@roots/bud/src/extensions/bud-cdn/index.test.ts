import {describe, jest, test} from '@jest/globals'
import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'

import extensionConstructor from './index'

jest.unstable_mockModule(
  `@roots/bud`,
  async () => await import(`@repo/test-kit/mocks/bud`),
)

describe(`@roots/bud/extensions/bud-cdn`, () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it(`should be constructable`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  it(`should be an instance of Extension`, async () => {
    const bud = await import(`@roots/bud`).then(
      ({default: Bud}) => new Bud(),
    )
    expect(
      // @ts-ignore
      new extensionConstructor(bud),
    ).toBeInstanceOf(Extension)
  })

  it(`should set cacheEnabled to false when disableCache is called`, async () => {
    const bud = await import(`@roots/bud`).then(
      ({default: Bud}) => new Bud(),
    )

    const instance = new extensionConstructor(
      // @ts-ignore
      bud,
    )

    instance.disableCache()
    expect(instance.cacheEnabled).toBe(false)
  })

  it(`should set lockfileLocation when setLockFileLocation is called`, async () => {
    const bud = await import(`@roots/bud`).then(
      ({default: Bud}) => new Bud(),
    )

    const instance = new extensionConstructor(
      // @ts-ignore
      bud,
    )

    instance.setLockfileLocation(`foo`)
    expect(instance.lockfileLocation).toBe(`foo`)
  })

  it(`should set cacheLocation when setCacheLocation is called`, async () => {
    const bud = await import(`@roots/bud`).then(
      ({default: Bud}) => new Bud(),
    )

    bud.maybeCall = jest.fn(arg => arg)

    const instance = new extensionConstructor(
      // @ts-ignore
      bud,
    )

    instance.setCacheLocation(`foo`)
    expect(instance.cacheLocation).toBe(`foo`)
  })

  it(`should call hooks.on from buildBefore`, async () => {
    const bud = await import(`@roots/bud`).then(
      ({default: Bud}) => new Bud(),
    )

    bud.maybeCall = jest.fn(arg => arg)

    const instance = new extensionConstructor(
      // @ts-ignore
      bud,
    )

    await instance.buildBefore()
    expect(instance.app.hooks.on).toHaveBeenCalled()
  })

  it(`should call extensions.add from buildBefore`, async () => {
    const bud = await import(`@roots/bud`).then(
      ({default: Bud}) => new Bud(),
    )

    bud.maybeCall = jest.fn(arg => arg)

    const instance = new extensionConstructor(
      // @ts-ignore
      bud,
    )

    await instance.buildBefore()
    expect(instance.app.extensions.add).toHaveBeenCalled()
  })
})
