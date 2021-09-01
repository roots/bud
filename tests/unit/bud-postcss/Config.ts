import {factory, Framework} from '@roots/bud'
import {BudPostCssExtension} from '@roots/bud-postcss/src/BudPostCssExtension'

describe('bud.postcss', () => {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      mode: 'production',
    })

    bud.use(BudPostCssExtension)
  })

  afterAll(done => {
    bud.close(done)
  })

  it('setPlugins functions', () => {
    bud.postcss.setPlugins({
      'postcss-import': require('postcss-import'),
      'postcss-nested': require('postcss-nested'),
      'postcss-preset-env': [
        require('postcss-preset-env'),
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
    })

    expect(Object.keys(bud.postcss.plugins)).toEqual([
      'postcss-import',
      'postcss-nested',
      'postcss-preset-env',
    ])

    expect(bud.postcss.plugins).toMatchSnapshot()
  })

  it('unsetPlugin functions', () => {
    bud.postcss.unsetPlugin('postcss-import')

    expect(Object.keys(bud.postcss.plugins)).toEqual([
      'postcss-nested',
      'postcss-preset-env',
    ])

    expect(bud.postcss.plugins).toMatchSnapshot()
  })

  it('setPlugin functions', () => {
    bud.postcss.setPlugin(
      'postcss-import',
      require('postcss-import'),
    )

    expect(Object.keys(bud.postcss.plugins)).toContain(
      'postcss-import',
    )

    expect(
      bud.postcss.plugins['postcss-import'][0],
    ).toBeDefined()

    expect(
      bud.postcss.plugins['postcss-import'][1],
    ).toBeUndefined()

    expect(bud.postcss.plugins).toMatchSnapshot()
  })

  it('setPluginOptions functions', () => {
    bud.postcss.setPluginOptions('postcss-import', {
      foo: 'bar',
    })

    expect(bud.postcss.plugins['postcss-import'][1]).toEqual({
      foo: 'bar',
    })

    expect(bud.postcss.plugins).toMatchSnapshot()
  })
})
