import {config, factory, Framework} from '@roots/bud'
import postcss from '@roots/bud-postcss'

describe('bud.postcss', () => {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      mode: 'development',
      config: {...config, ci: true},
    })
    bud.use(postcss)
  })

  afterAll(done => {
    bud.close(done)
  })

  it('setPlugins functions', () => {
    bud.postcss.setPlugins([
      'postcss-nested',
      [
        'postcss-preset-env',
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
    ])

    expect(Object.keys(bud.postcss.plugins)).toEqual([
      'postcss-import',
      'postcss-nested',
      'postcss-preset-env',
    ])
  })

  it('unsetPlugin functions', () => {
    bud.postcss.unsetPlugin('postcss-import')
    expect(Object.keys(bud.postcss.plugins)).toEqual([
      'postcss-nested',
      'postcss-preset-env',
    ])
  })

  it('setPlugin functions', () => {
    bud.postcss.setPlugin(['postcss-import', {}])

    expect(Object.keys(bud.postcss.plugins)).toContain(
      'postcss-import',
    )

    expect(
      bud.postcss.plugins['postcss-import'].shift(),
    ).toBeInstanceOf(Function)

    expect(bud.postcss.plugins['postcss-import'].pop()).toEqual(
      {},
    )
  })

  it('setPluginOptions functions', () => {
    bud.postcss.setPluginOptions('postcss-import', {
      foo: 'bar',
    })

    expect(bud.postcss.plugins['postcss-import'].pop()).toEqual({
      foo: 'bar',
    })
  })
})
