import BudPostCssExtension from '@roots/bud-postcss'
import {PostCssConfig} from '@roots/bud-postcss/src/PostCssConfig/index'

describe('@roots/bud-postcss', () => {
  let config: PostCssConfig

  beforeAll(async () => {
    config = new PostCssConfig()
  })

  it('has @roots/bud-postcss name', () => {
    expect(BudPostCssExtension.name).toBe('@roots/bud-postcss')
  })

  it('exports a boot method', () => {
    expect(BudPostCssExtension.boot).toBeInstanceOf(Function)
  })

  it('exports api', () => {
    expect(BudPostCssExtension.api).toBeDefined()
  })

  it('config is instantiable', () => {
    expect(config).toBeInstanceOf(PostCssConfig)
  })
})
