import {type Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudSWCExtension from '@roots/bud-swc'

describe(`@roots/bud-swc`, () => {
  let bud: Bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
  })

  it(`should be instantiable`, () => {
    expect(new BudSWCExtension(bud as any)).toBeInstanceOf(BudSWCExtension)
  })

  it(`should call hooks.on during registration`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await new BudSWCExtension(bud as any).register(bud as any)
    expect(onSpy).toHaveBeenCalled()
  })

  it(`should add a plugin`, async () => {
    const extension = new BudSWCExtension(bud as any)
    extension.setPlugins(plugins => {
      if (Array.isArray(plugins)) {
        plugins.push([`test`, {}])
        return plugins
      }
      return [`test`, {}]
    })

    expect(extension.options?.jsc?.experimental?.plugins?.[0]).toEqual([
      `test`,
      expect.objectContaining({}),
    ])
  })
})
