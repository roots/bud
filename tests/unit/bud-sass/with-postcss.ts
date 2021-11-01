import {factory, Framework} from '@roots/bud'
import BudPostCssExtension from '@roots/bud-postcss'

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

  beforeAll(async () => {
    bud = await factory()

    bud.use(BudPostCssExtension)
    bud.postcss.setPlugins(mock.plugins as any)
  })

  afterAll(done => {
    bud.close(done)
  })

  test.todo('css rule includes postcss and sass')
})
