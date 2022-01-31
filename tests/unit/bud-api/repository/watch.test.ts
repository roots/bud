import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.watch', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
  })

  it('is a function', () => {
    expect(bud.watch).toBeInstanceOf(Function)
  })

  it('sets watch files', async () => {
    bud.watch(['**/*.js'])

    await bud.api.processQueue()

    expect(bud.hooks.filter('dev.watch.files')).toMatchSnapshot([
      '**/*.js',
    ])
  })

  it('merges watch files', async () => {
    bud.watch(['foo/*.js'])

    await bud.api.processQueue()

    expect(bud.hooks.filter('dev.watch.files')).toMatchSnapshot([
      '**/*.js',
      'foo/*.js',
    ])
  })

  it('set watch options', async () => {
    bud.watch([], {depth: 1})

    await bud.api.processQueue()

    expect(bud.hooks.filter('dev.watch.options')).toMatchSnapshot({
      depth: 1,
    })
  })

  it('merges watch options', async () => {
    bud.watch([], {cwd: '/srv/www'})

    await bud.api.processQueue()

    expect(bud.hooks.filter('dev.watch.options')).toMatchSnapshot({
      cwd: '/srv/www',
      depth: 1,
    })
  })
})
