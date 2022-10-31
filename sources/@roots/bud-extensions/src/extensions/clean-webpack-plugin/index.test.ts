import {describe, test} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'

import extensionConstructor from './index'

describe(`clean-webpack-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(extensionConstructor).toBeInstanceOf(Function)
  })

  it(`is enabled in production`, async () => {
    let bud = await factory()
    let instance = new extensionConstructor(bud)

    expect(bud.isProduction).toBe(true)
    expect(await instance.isEnabled()).toBe(true)
  })

  it(`is disable-able`, async () => {
    let bud = await factory()
    let instance = new extensionConstructor(bud)

    instance.disable()
    expect(await instance.isEnabled()).toBe(false)
  })
})
