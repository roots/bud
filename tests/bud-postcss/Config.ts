import {Framework, setupBud, teardownBud} from '../util'
import postcss from '@roots/bud-postcss'

describe('bud.postcss', () => {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud('production')
    bud.use([postcss])
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  it('setPlugins functions', () => {
    bud.postcss.setPlugins({
      import: 'postcss-import',
      'preset-env': [
        'postcss-preset-env',
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
    })

    expect(bud.postcss.plugins).toEqual({
      import: ['postcss-import', {}],
      'preset-env': [
        'postcss-preset-env',
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
    })
  })

  it('unsetPlugin functions', () => {
    bud.postcss.unsetPlugin('import')
    expect(
      bud.build.items.postcss.make(bud).options.postcssOptions
        .plugins,
    ).toEqual(
      Object.values({
        'preset-env': [
          'postcss-preset-env',
          {
            stage: 1,
            features: {
              'focus-within-pseudo-class': false,
            },
          },
        ],
      }),
    )
  })

  it('setPlugin functions', () => {
    bud.postcss.setPlugin('import', ['postcss-import', {}])

    expect(
      bud.build.items.postcss.make(bud).options.postcssOptions
        .plugins,
    ).toEqual([
      [
        'postcss-preset-env',
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
      ['postcss-import', {}],
    ])
  })

  it('setPluginOptions functions', () => {
    bud.postcss.setPluginOptions('import', {
      foo: 'bar',
    })

    expect(
      bud.build.items.postcss.make(bud).options.postcssOptions
        .plugins,
    ).toEqual([
      [
        'postcss-preset-env',
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
      ['postcss-import', {foo: 'bar'}],
    ])
  })
})
