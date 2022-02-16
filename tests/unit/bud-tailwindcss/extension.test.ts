import '@roots/bud-postcss'

import {BudPostCssExtension} from '@roots/bud-postcss/src/postcss.extension'
import {BudTailwindCssExtension} from '@roots/bud-tailwindcss/src/tailwind.extension'

import {Bud, factory} from '@repo/test-kit/bud'

describe('@roots/bud-tailwindcss', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('has name prop', () => {
    expect(BudTailwindCssExtension.name).toBe(
      '@roots/bud-tailwindcss',
    )
  })

  it('has an api prop', () => {
    expect(BudTailwindCssExtension.api.tailwind).toBeInstanceOf(
      Function,
    )
  })

  it('sets up postcss plugins', async () => {
    await bud.use([BudPostCssExtension, BudTailwindCssExtension])
    await bud.api.processQueue()

    expect(bud.postcss.getKeys()).toEqual([
      'postcss-import',
      'tailwindcss-nesting',
      'tailwindcss',
      'postcss-preset-env',
    ])
  })
})
