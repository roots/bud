import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.experiments', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({})
  })

  it('is a function', () => {
    expect(bud.experiments).toBeInstanceOf(Function)
  })

  it('enables build.config.experiments', async () => {
    await bud.api.call('experiments', 'lazyCompilation', true)
    const output = bud.hooks.filter('build.experiments')
    expect(output).toEqual({lazyCompilation: true})
  })
})
