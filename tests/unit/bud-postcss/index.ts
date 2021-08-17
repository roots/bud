import {config, factory, Framework} from '@roots/bud'
import postcss, {PostCssConfig} from '@roots/bud-postcss'

describe('@roots/bud-postcss', () => {
  let bud: Framework

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
    bud = factory({config: {...config, ci: true}})
    bud.use([postcss])
    bud.postcss.setPlugins(mock.plugins as any)
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has @roots/bud-postcss name', () => {
    expect(postcss.name).toBe('@roots/bud-postcss')
  })

  it('exports a boot method', () => {
    expect(postcss.boot).toBeInstanceOf(Function)
  })

  it('exports api', () => {
    expect(postcss.api.postcss).toBeInstanceOf(PostCssConfig)
  })

  it('exports and registers a bud extension', () => {
    expect(postcss).toEqual(
      bud.extensions.get('@roots/bud-postcss').module,
    )
  })
})
