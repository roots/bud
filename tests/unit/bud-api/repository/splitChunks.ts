import {Bud, factory} from '@roots/bud'

describe.skip('bud.splitChunks', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(() => {
    bud.hooks.on('build/optimization/splitChunks', undefined)
  })

  it('sets default options when called', () => {
    bud.splitChunks()

    expect(
      bud.hooks.filter('build/optimization/splitChunks'),
    ).toMatchSnapshot()
  })

  it('sets options when passed as parameters', () => {
    const param = {
      cacheGroups: {
        chunks: 'all',
      },
    }

    bud.splitChunks(param)

    expect(
      bud.hooks.filter('build/optimization/splitChunks'),
    ).toBe(param)
  })
})
