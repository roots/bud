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
    await bud.api.call('watch', '1/*.js')

    expect(
      Array.from(bud.hooks.filter('dev.watch.files')),
    ).toMatchSnapshot(['1/*.js'])
  })

  it('sets watch files', async () => {
    await bud.api.call('watch', ['2/*.js'])

    expect(
      Array.from(bud.hooks.filter('dev.watch.files')),
    ).toMatchSnapshot(['1/*.js', '2/*.js'])
  })

  it('merges watch files', async () => {
    await bud.api.call('watch', '3/*.js')

    expect(Array.from(bud.hooks.filter('dev.watch.files')).length).toEqual(
      3,
    )
  })
})
