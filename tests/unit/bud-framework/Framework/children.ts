import {factory, Framework} from '@roots/bud'

describe('@roots/bud-framework child', () => {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
      },
    })

    bud.logger.instance.scope('test', 'bud.framework.children')
  })

  it("root compiler's name is this", () => {
    expect(bud.name).toBe('bud')
  })

  it('root.isRoot is false', () => {
    expect(bud.isRoot).toBe(true)
  })
})
