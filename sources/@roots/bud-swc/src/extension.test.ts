/* eslint-disable no-console */
import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudSWCExtension from './index'

describe(`@roots/bud-swc`, () => {
  let bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
  })

  it(`is instantiable`, () => {
    expect(new BudSWCExtension(bud)).toBeInstanceOf(BudSWCExtension)
  })

  it(`calls hooks.on during registration`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await new BudSWCExtension(bud).register(bud)
    expect(onSpy).toHaveBeenCalled()
  })

  it(`calls registerSWC during configAfter`, async () => {
    const extension = new BudSWCExtension(bud)
    const registerSWCSpy = vi.spyOn(extension, `registerSWC`)
    await extension.configAfter(bud)
    expect(registerSWCSpy).toHaveBeenCalled()
  })
})
