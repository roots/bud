/* eslint-disable no-console */
import {beforeEach, describe, expect, it, jest} from '@jest/globals'

import BudSWCExtension from './index'

jest.unstable_mockModule(
  `@roots/bud`,
  async () => await import(`@repo/test-kit/mocks/bud`),
)

describe(`@roots/bud-swc`, () => {
  let bud

  beforeEach(async () => {
    jest.clearAllMocks()
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
  })

  it(`is instantiable`, () => {
    expect(new BudSWCExtension(bud)).toBeInstanceOf(BudSWCExtension)
  })

  it(`calls hooks.on during registration`, async () => {
    await new BudSWCExtension(bud).register()
    expect(bud.hooks.on).toHaveBeenCalled()
  })

  it(`calls registerSWC during buildBefore`, async () => {
    const extension = new BudSWCExtension(bud)
    const registerSWCSpy = jest.spyOn(extension, `registerSWC`)
    await extension.buildBefore()
    expect(registerSWCSpy).toHaveBeenCalled()
  })
})
