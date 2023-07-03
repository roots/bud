import {factory} from '@repo/test-kit'
import {describe, expect, it} from 'vitest'

import extensionConstructor from '../../src/clean-webpack-plugin/index.js'

describe(`@roots/bud-extensions/clean-webpack-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  it(`is enabled in production`, async () => {
    let bud = await factory()
    let instance = new extensionConstructor(bud)

    expect(bud.isProduction).toBe(true)
    expect(instance.isEnabled()).toBe(true)
  })

  it(`is disable-able`, async () => {
    let bud = await factory()
    let instance = new extensionConstructor(bud)

    instance.enable(false)
    expect(instance.isEnabled()).toBe(false)
  })
})
