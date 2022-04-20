import {Bud, factory} from '@repo/test-kit/bud'
import BudPostCss from '@roots/bud-postcss'
import BudTailwindCssExtension from '@roots/bud-tailwindcss'

describe('@roots/bud-tailwindcss', () => {
  let bud: Bud
  let instance: BudTailwindCssExtension

  beforeAll(async () => {
    bud = await factory()
    instance = new BudTailwindCssExtension(bud)
  })

  it('has name prop', () => {
    expect(instance.label).toBe('@roots/bud-tailwindcss')
  })

  it('sets up postcss plugins', async () => {
    const bud = await factory()

    await bud.extensions.add(BudPostCss)
    await bud.extensions.add(BudTailwindCssExtension)
    const plugins = [...bud.postcss.plugins.keys()]

    expect(plugins).toEqual([
      'postcss-import',
      'tailwindcss-nesting',
      'tailwindcss',
      'postcss-preset-env',
    ])
  })
})
