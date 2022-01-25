import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.alias', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.alias).toBeInstanceOf(Function)
  })

  it('is configurable by bud.alias', async () => {
    bud.alias({'@foo': 'bar'})

    await bud.api.processQueue()
    await bud.build.make()

    const filteredAlias = await bud.hooks.filterAsync(
      'build.resolve.alias',
    )

    expect(filteredAlias).toEqual({
      '@foo': bud.path('project', 'bar'),
    })

    expect(bud.build.config.resolve.alias).toEqual({
      '@foo': bud.path('project', 'bar'),
    })
  })
})
