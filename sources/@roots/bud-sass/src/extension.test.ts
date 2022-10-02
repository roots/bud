/* eslint-disable no-console */
import {beforeEach, describe, expect, it, jest} from '@jest/globals'

import BudSassExtension from './index'

jest.unstable_mockModule(
  `@roots/bud`,
  async () => await import(`@repo/test-kit/mocks/bud`),
)

describe(`@roots/bud-sass`, () => {
  let bud

  beforeEach(async () => {
    jest.clearAllMocks()
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
  })

  it(`should be instantiable`, () => {
    expect(new BudSassExtension(bud)).toBeInstanceOf(BudSassExtension)
  })

  it(`should call import when sass.register is called`, async () => {
    const extension = new BudSassExtension(bud)
    const importSpy = jest.spyOn(extension, `import`)

    try {
      await extension.register()
    } catch (e) {}
    expect(importSpy).toHaveBeenCalled()
  })

  it(`should call setOptions when sass.register is called`, async () => {
    const extension = new BudSassExtension(bud)
    // @ts-ignore
    extension.import = jest.fn(() => ({}))
    const setOptionsSpy = jest.spyOn(extension, `setOptions`)

    try {
      await extension.register()
    } catch (e) {}
    expect(setOptionsSpy).toHaveBeenCalled()
  })

  it(`should call setOption when sass.registerGlobal is called`, async () => {
    const extension = new BudSassExtension(bud)
    const setOptionSpy = jest.spyOn(extension, `setOption`)

    try {
      extension.registerGlobal(`$primary-color: #ff0000;`)
    } catch (e) {}

    expect(setOptionSpy).toHaveBeenCalled()
  })

  it(`should call setLoader when configAfter is called`, async () => {
    const extension = new BudSassExtension(bud)

    try {
      await extension.configAfter()
    } catch (e) {}

    expect(bud.build.setLoader).toHaveBeenCalledWith(`sass-loader`)
  })
})
