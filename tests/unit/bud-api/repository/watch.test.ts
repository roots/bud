import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.watch', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      mode: 'development',
    })
  })

  it('is a function', () => {
    expect(bud.watch).toBeInstanceOf(Function)
  })

  it('sets watch files', async () => {
    await bud.api.call('watch', ['**/*.js'])

    expect(
      Array.from(bud.hooks.filter('dev.watch.files')),
    ).toMatchSnapshot('**/*.js')
  })

  it('merges watch files', async () => {
    bud.watch('foo/*.js')

    await bud.api.processQueue()

    expect(Array.from(bud.hooks.filter('dev.watch.files')).length).toEqual(
      2,
    )
  })
})
