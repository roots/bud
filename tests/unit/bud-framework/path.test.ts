import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.path', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('path: is a function', () => {
    expect(bud.path).toBeInstanceOf(Function)
  })

  it('path: returns the correct default context', () => {
    expect(bud.path('project')).toEqual(
      `${process.cwd()}/tests/util/project`,
    )
  })

  it('path: returns correct paths joined to context', () => {
    expect(bud.path('project', 'foo')).toEqual(
      `${process.cwd()}/tests/util/project/foo`,
    )
  })

  it('path: returns correct multipart paths joined to context', () => {
    expect(bud.path('project', 'foo', 'bar')).toEqual(
      `${process.cwd()}/tests/util/project/foo/bar`,
    )
  })
})
