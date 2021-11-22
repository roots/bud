import {factory} from '@roots/bud'
import {BudPostCssExtension} from '@roots/bud-postcss/src/BudPostCssExtension'
import {BudTailwindCssExtension} from '@roots/bud-tailwindcss/src/tailwind.service'

process.env.BUD_KEEP_ALIVE = 'true'

describe.skip('@roots/bud-tailwindcss', () => {
  let bud

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
      },
    })

    bud.project.discover('devDependencies')

    bud.use([BudPostCssExtension, BudTailwindCssExtension])
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

  it('sets up postcss plugins', () => {
    expect(Object.keys(bud.postcss.plugins)).toEqual([
      'postcss-import',
      'postcss-nested',
      'postcss-preset-env',
      'tailwindcss',
    ])
  })
})
