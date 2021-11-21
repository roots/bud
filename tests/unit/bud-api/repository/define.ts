import {define} from '@roots/bud-api/src/Api/methods/define/index'

describe('bud.config', function () {
  it('is a function', () => {
    expect(define).toBeInstanceOf(Function)
  })

  it.todo('modifies bud.store')
})
