import postcss from '@roots/bud-postcss'

import {Framework, setupBud, teardownBud} from '../../util'

describe('@roots/bud-postcss', () => {
  let bud: Framework = setupBud('production')

  let mock = {
    plugins: [
      ['postcss-import'],
      ['postcss-nested'],
      [
        'postcss-preset-env',
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
    ],
  }

  beforeAll(() => {
    bud.use([postcss])
    bud.postcss.setPlugins(mock.plugins as any)
  })

  afterAll(() => {
    teardownBud(bud)
  })

  it('exports and registers a bud extension', () => {
    const registered = bud.extensions.get('@roots/bud-postcss')
    expect(postcss).toEqual(registered.module)
  })

  it('has @roots/bud-postcss name', () => {
    expect(postcss.name).toBe('@roots/bud-postcss')
  })

  it('exports a boot method', () => {
    expect(postcss.boot).toBeInstanceOf(Function)
  })
})
