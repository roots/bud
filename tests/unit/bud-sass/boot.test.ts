import {Bud, factory} from '@repo/test-kit/bud'
import BudPostCss from '@roots/bud-postcss'
import * as BudSass from '@roots/bud-sass'

describe('@roots/bud-sass registration', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(BudPostCss)
    await BudSass.boot(bud, bud.extensions.logger)
  })

  it('adds postcss-scss syntax', () => {
    expect(bud.postcss.syntax).toBe('postcss-scss')
  })
})
