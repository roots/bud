/* eslint-disable no-console */
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudSassExtension from '../src/index'

vi.mock(`@roots/bud`, async () => await import(`@repo/test-kit/mocks/bud`))

describe(`@roots/bud-sass`, () => {
  let bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
  })

  it(`should be instantiable`, () => {
    expect(new BudSassExtension(bud)).toBeInstanceOf(BudSassExtension)
  })

  it(`should call import when sass.register is called`, async () => {
    const extension = new BudSassExtension(bud)
    const importSpy = vi.spyOn(extension, `import`)

    try {
      await extension.register()
    } catch (e) {}
    expect(importSpy).toHaveBeenCalled()
  })

  it(`should call setOptions when sass.register is called`, async () => {
    const extension = new BudSassExtension(bud)
    // @ts-ignore
    extension.import = vi.fn(() => ({}))
    const setOptionsSpy = vi.spyOn(extension, `setOptions`)

    try {
      await extension.register()
    } catch (e) {}
    expect(setOptionsSpy).toHaveBeenCalled()
  })

  it(`should call setOption when sass.registerGlobal is called`, async () => {
    const extension = new BudSassExtension(bud)
    const setOptionSpy = vi.spyOn(extension, `setOption`)

    try {
      extension.registerGlobal(`$primary-color: #ff0000;`)
    } catch (e) {}

    expect(setOptionSpy).toHaveBeenCalledWith(
      `additionalData`,
      expect.any(Function),
    )
  })

  it(`should call setLoader when configAfter is called`, async () => {
    const extension = new BudSassExtension(bud)

    try {
      await extension.configAfter()
    } catch (e) {}

    expect(bud.build.setLoader).toHaveBeenCalledWith(`sass-loader`)
  })

  it(`should call setItem when configAfter is called`, async () => {
    const extension = new BudSassExtension(bud)

    try {
      await extension.configAfter()
    } catch (e) {}

    expect(bud.build.setItem).toHaveBeenCalledWith(
      `sass`,
      expect.objectContaining({
        loader: `sass-loader`,
        options: {
          additionalData: `$primary-color: #ff0000;`,
          implementation: expect.any(Object),
          sourceMap: true,
        },
      }),
    )
  })

  it(`should call setRule when configAfter is called`, async () => {
    const extension = new BudSassExtension(bud)

    try {
      await extension.configAfter()
    } catch (e) {}

    expect(bud.build.setRule).toHaveBeenCalledWith(
      `sass`,
      expect.objectContaining({
        include: expect.arrayContaining([expect.any(Function)]),
        test: expect.any(Function),
        use: [`precss`, `css`, `postcss`, `resolveUrl`, `sass`],
      }),
    )
  })

  it(`should set postcss syntax`, async () => {
    const extension = new BudSassExtension(bud)

    // @ts-ignore
    extension.app.postcss = {
      syntax: ``,
    }

    try {
      await extension.configAfter()
    } catch (e) {}

    expect(extension.app.postcss.syntax).toEqual(`postcss-scss`)
  })

  it(`should register global when importGlobal is called`, async () => {
    const extension = new BudSassExtension(bud)
    const registerGlobalSpy = vi.spyOn(extension, `registerGlobal`)

    try {
      extension.importGlobal(`@src/styles/global.scss`)
    } catch (e) {}

    expect(registerGlobalSpy).toHaveBeenCalledWith([
      `@import "@src/styles/global.scss";`,
    ])
  })
})
