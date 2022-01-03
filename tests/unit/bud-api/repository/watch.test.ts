import {Bud, factory} from '../../../util/bud'

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

  it("doesn't throw when called in production", () => {
    expect(bud.watch(['**/*.js'])).toBeInstanceOf(Bud)
  })

  it('sets watch files', async () => {
    const files = ['**/*.js']

    bud.watch(files)

    await bud.api.processQueue()

    expect(bud.store.get('server.watch.files')).toMatchSnapshot(
      files,
    )
  })
})
