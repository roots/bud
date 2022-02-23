import '@roots/bud-postcss'

import {Bud, factory} from '@repo/test-kit/bud'
import {BudPostCssExtension} from '@roots/bud-postcss/src/postcss.extension'
import * as BudTailwindCssExtension from '@roots/bud-tailwindcss'

describe('@roots/bud-tailwindcss', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('has name prop', () => {
    expect(BudTailwindCssExtension.name).toBe('@roots/bud-tailwindcss')
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
