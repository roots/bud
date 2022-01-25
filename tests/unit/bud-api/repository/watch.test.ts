import {Bud, factory} from '../../../util/bud'

describe('bud.watch', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.watch).toBeInstanceOf(Function)
  })

  it('sets watch files', async () => {
    bud.watch(['**/*.js'])

    await bud.api.processQueue()

    expect(bud.store.get('server.watch.files')).toMatchSnapshot([
      '**/*.js',
    ])
  })

  it('merges watch files', async () => {
    bud.watch(['foo/*.js'])

    await bud.api.processQueue()

    expect(bud.store.get('server.watch.files')).toMatchSnapshot([
      '**/*.js',
      'foo/*.js',
    ])
  })

  it('set watch options', async () => {
    bud.watch([], {depth: 1})

    await bud.api.processQueue()

    expect(bud.store.get('server.watch.options')).toMatchSnapshot({
      depth: 1,
    })
  })

  it('merges watch options', async () => {
    bud.watch([], {cwd: '/srv/www'})

    await bud.api.processQueue()

    expect(bud.store.get('server.watch.options')).toMatchSnapshot({
      cwd: '/srv/www',
      depth: 1,
    })
  })
})
