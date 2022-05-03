import {Bud, factory} from '@repo/test-kit/bud'
import BudPostCss from '@roots/bud-postcss'

describe('@roots/bud-postcss', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(BudPostCss)
  })

  it('has name', () => {
    expect(bud.postcss.label).toBe('@roots/bud-postcss')
  })
})
