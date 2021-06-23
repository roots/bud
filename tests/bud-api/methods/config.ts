import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.config', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
    return
  })

  afterAll(() => {
    teardownBud(bud)
    return
  })

  it('is a function', () => {
    expect(bud.config).toBeInstanceOf(Function)
  })

  it('modifies bud.store', () => {
    bud.config({clean: false})

    expect(bud.store.isTrue('clean')).toEqual(false)
  })
})

export {}
