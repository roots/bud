import '@roots/bud-postcss'

import {Bud, factory} from '@repo/test-kit/bud'
import {BudPostCssExtension} from '@roots/bud-postcss/src/postcss.extension'
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
    bud.use([BudPostCssExtension, BudTailwindCssExtension])
    await bud.api.processQueue()

    expect(bud.postcss.getKeys()).toEqual([
      'postcss-import',
      'tailwindcss-nesting',
      'tailwindcss',
      'postcss-preset-env',
    ])
  })
})
