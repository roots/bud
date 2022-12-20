import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import Sage from './index.js'

describe(`@roots/sage`, async () => {
  let bud: Bud
  let sage: Sage

  beforeEach(async () => {
    bud = await factory()
    sage = new Sage(bud)
  })

  it(`shouldn't try to call tailwindcss if it doesn't exist`, async () => {
    // @ts-ignore
    bud.extensions.remove(`@roots/bud-tailwindcss`)
    const extensionsGetSpy = vi.spyOn(bud.extensions, `get`)

    await sage.register(bud)
    expect(extensionsGetSpy).not.toHaveBeenCalled()
  })

  it(`shouldn't try to call tailwindcss if it doesn't exist`, async () => {
    const extensionsGetSpy = vi.spyOn(bud.extensions, `get`)
    await sage.register(bud)
    expect(extensionsGetSpy).toHaveBeenCalled()
  })

  it(`should register errything`, async () => {
    const hooksSpy = vi.spyOn(bud.hooks, `on`)
    const setPathSpy = vi.spyOn(bud, `setPath`)
    const aliasSpy = vi.spyOn(bud, `alias`)

    await sage.register(bud)
    expect(hooksSpy).toHaveBeenNthCalledWith(
      1,
      `build.output.uniqueName`,
      `@roots/bud/sage`,
    )

    expect(setPathSpy).toHaveBeenCalledWith({
      '@src': `resources`,
      '@resources': `@src`,
      '@fonts': `@src/fonts`,
      '@images': `@src/images`,
      '@scripts': `@src/scripts`,
      '@styles': `@src/styles`,
      '@dist': `public`,
      '@public': `@dist`,
    })

    expect(aliasSpy).toHaveBeenCalledWith({
      '@fonts': bud.path(`@fonts`),
      '@images': bud.path(`@images`),
      '@scripts': bud.path(`@scripts`),
      '@styles': bud.path(`@styles`),
    })
  })
})
