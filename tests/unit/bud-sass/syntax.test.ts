import {Bud, factory} from '@repo/test-kit/bud'
import BudPostCss from '@roots/bud-postcss'
import BudSass from '@roots/bud-sass'
import BudResolveUrl from '@roots/bud-sass/resolve-url'

describe('@roots/bud-sass sets postcss syntax', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(BudResolveUrl)
    await bud.extensions.add(BudPostCss)
    await new BudSass(bud).afterConfig()
  })

  it('adds postcss-scss syntax', () => {
    expect(bud.postcss.syntax).toBe('postcss-scss')
  })
})
