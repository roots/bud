/* eslint-disable no-console */
import Bud from '@roots/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudSWCExtension from './index'

vi.mock(`@roots/bud`, async () => await import(`@repo/test-kit/mocks/bud`))

describe(`@roots/bud-swc`, () => {
  let bud: Bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
  })

  it(`is instantiable`, () => {
    expect(new BudSWCExtension(bud)).toBeInstanceOf(BudSWCExtension)
  })

  it(`calls hooks.on during registration`, async () => {
    await new BudSWCExtension(bud).register(bud)
    expect(bud.hooks.on).toHaveBeenCalled()
  })

  it(`calls registerSWC during configAfter`, async () => {
    const extension = new BudSWCExtension(bud)
    const registerSWCSpy = vi.spyOn(extension, `registerSWC`)
    await extension.configAfter(bud)
    expect(registerSWCSpy).toHaveBeenCalled()
  })
})
