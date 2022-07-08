import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.bundle', () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it('sets from string', async () => {
    bud.bundle('react')

    await bud.api.processQueue()

    expect(
      bud.hooks.filter('build.optimization.splitChunks'),
    ).toMatchSnapshot()
  })

  it('sets from arrayed string', async () => {
    bud.bundle('react', ['react', 'react-dom'])

    await bud.api.processQueue()

    expect(
      bud.hooks.filter('build.optimization.splitChunks'),
    ).toMatchSnapshot()
  })
})
