import {Bud, factory} from '@repo/test-kit/bud'

describe.skip('bud.splitChunks', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(() => {
    bud.hooks.on('build.optimization.splitChunks', undefined)
  })

  it('sets default options when called', () => {
    bud.splitChunks()

    expect(
      bud.hooks.filter('build.optimization.splitChunks'),
    ).toMatchSnapshot()
  })

  it('sets options when passed as parameters', async () => {
    const param = {
      cacheGroups: {
        chunks: 'all',
      },
    }

    bud.splitChunks(param)

    await bud.api.processQueue()

    expect(bud.hooks.filter('build.optimization.splitChunks')).toBe(param)
  })
})
