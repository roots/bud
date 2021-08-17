import {config, factory} from '@roots/bud'
import postcss from '@roots/bud-postcss'
import * as tailwindcss from '@roots/bud-tailwindcss'

process.env.BUD_KEEP_ALIVE = 'true'

describe('@roots/bud-tailwindcss', () => {
  let bud

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})

    bud.discovery.set('devDependencies', {
      postcss: '*',
      'postcss-preset-env': '*',
      'postcss-import': '*',
      tailwindcss: '*',
    })

    bud.use([postcss, tailwindcss])
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has name prop', () => {
    expect(tailwindcss.name).toBe('@roots/bud-tailwindcss')
  })

  it('has an api prop', () => {
    expect(tailwindcss.api.tailwind).toBeInstanceOf(Function)
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
