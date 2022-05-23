import {Bud, factory} from '@repo/test-kit/bud'
import {Modules} from '@roots/bud-framework'
import BudTerser from '@roots/bud-terser'

describe('@roots/bud-terser', () => {
  let bud: Bud
  let extension: Modules['@roots/bud-terser']

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(BudTerser)
    extension = bud.extensions.get('@roots/bud-terser')
  })

  it('has name prop', () => {
    expect(extension.label).toBe('@roots/bud-terser')
  })

  it('has options prop', () => {
    expect(extension.options).toStrictEqual({
      extractComments: false,
      include: /\.(cjs|mjs|jsx?)$/,
      terserOptions: {
        compress: false,
        mangle: {
          safari10: true,
        },
        output: {
          ascii_only: true,
          comments: false,
        },
      },
    })
  })

  it('exposes self @ bud.terser', async () => {
    await bud.extensions.add([BudTerser])
    expect(bud.terser).toBeInstanceOf(BudTerser)
  })
})
