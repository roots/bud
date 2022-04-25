import {Bud, factory} from '@repo/test-kit/bud'
import {Controller} from '@roots/bud-extensions'
import {Modules} from '@roots/bud-framework'
import BudTerser from '@roots/bud-terser'

describe('@roots/bud-terser', () => {
  let bud: Bud
  let controller: Controller<Modules['@roots/bud-terser']>

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(BudTerser)
    controller = bud.extensions.get('@roots/bud-terser')
  })

  it('has name prop', () => {
    expect(controller.get('label')).toBe('@roots/bud-terser')
  })

  it('has options prop', () => {
    expect(controller.module.options).toStrictEqual({
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

  it('has boot prop', () => {
    expect(controller.module.boot).toBeInstanceOf(Function)
  })

  it('binds the bud.terser function', async () => {
    await bud.extensions.add([BudTerser])
    expect(bud.terser).toBeInstanceOf(Function)
  })
})
