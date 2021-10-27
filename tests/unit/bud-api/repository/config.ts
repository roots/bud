import {factory, Framework} from '@roots/bud'

describe('bud.config', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(bud.config).toBeInstanceOf(Function)
  })

  it('modifies bud.store', () => {
    bud.config({clean: false})

    expect(bud.store.isTrue('clean')).toEqual(false)
  })
})
