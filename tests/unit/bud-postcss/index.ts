import {factory, Framework} from '@roots/bud'
import * as BudPostCssExtension from '@roots/bud-postcss'

describe('@roots/bud-postcss', () => {
  let bud: Framework

  let mock = {
    plugins: {
      'postcss-import': require.resolve('postcss-import'),
      'postcss-nested': require.resolve('postcss-nested'),
      'postcss-preset-env': [
        require.resolve('postcss-preset-env'),
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
    },
  }

  beforeAll(() => {
    bud = factory()
    bud.use([BudPostCssExtension])
    bud.postcss.setPlugins(mock.plugins as any)
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has @roots/bud-postcss name', () => {
    expect(BudPostCssExtension.name).toBe('@roots/bud-postcss')
  })

  it('exports a boot method', () => {
    expect(BudPostCssExtension.boot).toBeInstanceOf(Function)
  })

  it('exports api', () => {
    expect(BudPostCssExtension.api.postcss).toBeInstanceOf(
      BudPostCssExtension.PostCssConfig,
    )
  })

  it('exports and registers a bud extension', () => {
    expect(BudPostCssExtension).toEqual(
      bud.extensions.get('@roots/bud-postcss').module,
    )
  })
})
