import {Bud, factory} from '@repo/test-kit/bud'
import BudSass from '@roots/bud-sass'

describe('@roots/bud-sass registration', () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    await bud.extensions.add(BudSass)
  })

  it('adds sass as bud property', () => {
    expect(bud.sass).toBeInstanceOf(BudSass)
  })

  it('bud.sass.setOption', async () => {
    bud.sass.setOption(
      'additionalData',
      `@import "@styles/common/variables";`,
    )
    expect(bud.sass.getOption('additionalData')).toBe(
      `@import "@styles/common/variables";`,
    )
  })

  it('uses configured values', async () => {
    bud.sass.setOption(
      'additionalData',
      `@import "@styles/common/variables";`,
    )
    await bud.extensions.runAll('_afterConfig')
    expect(bud.build.items.sass.getOptions().additionalData).toBe(
      `@import "@styles/common/variables";`,
    )
  })
})
