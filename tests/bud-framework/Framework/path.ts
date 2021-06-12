import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.path', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    bud = teardownBud(bud)
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
})
