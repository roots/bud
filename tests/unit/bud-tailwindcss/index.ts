import {config, factory} from '@roots/bud'
import * as BudPostCssExtension from '@roots/bud-postcss'
import * as BudTailwindCssExtension from '@roots/bud-tailwindcss'

process.env.BUD_KEEP_ALIVE = 'true'

describe.skip('@roots/bud-tailwindcss', () => {
  let bud

  beforeAll(() => {
    bud = factory({
      config: {
        ...config,
        ci: true,
      },
    })

    bud.discovery.set('devDependencies', {
      '@roots/bud-tailwindcss':
        'workspace:@roots/packages/bud-tailwindcss',
      '@roots/bud-postcss':
        'workspace:@roots/packages/bud-postcss',
    })

    bud.discovery.discover('devDependencies')

    bud.use([BudPostCssExtension, BudTailwindCssExtension])
  })

  afterAll(done => {
    bud.close(done)
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
