import {Bud, factory} from '@roots/bud'

describe('bud.path', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
      },
    })
  })

  it('path: is a function', () => {
    expect(bud.path).toBeInstanceOf(Function)
  })

  it('path: returns the correct default context', () => {
    expect(bud.path('project')).toEqual(process.cwd())
  })

  it('path: returns correct paths joined to context', () => {
    expect(bud.path('project', 'foo')).toEqual(
      `${process.cwd()}/foo`,
    )
  })

  it('path: returns correct multipart paths joined to context', () => {
    expect(bud.path('project', 'foo', 'bar')).toEqual(
      `${process.cwd()}/foo/bar`,
    )
  })
})
