import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudSWCExtension from '@roots/bud-swc'

describe(`@roots/bud-swc`, () => {
  let bud: Bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
  })

  it(`should be instantiable`, () => {
    expect(new BudSWCExtension(bud)).toBeInstanceOf(BudSWCExtension)
  })

  it(`should call hooks.on during registration`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await new BudSWCExtension(bud).register(bud)
    expect(onSpy).toHaveBeenCalled()
  })

  it(`should add a plugin`, async () => {
    const extension = new BudSWCExtension(bud)
    extension.plugins(plugins => {
      plugins.push([`test`, {}])
      return plugins
    })
    expect(extension.options?.jsc?.experimental?.plugins?.[0]).toEqual([
      `test`,
      expect.objectContaining({}),
    ])
  })
})
