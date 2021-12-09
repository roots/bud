import * as imagemin from '@roots/bud-imagemin'

describe('@roots/bud-imagemin', () => {
  it('has expected exports', () => {
    expect(imagemin.name).toBe('@roots/bud-imagemin')
    expect(imagemin.register).toBeInstanceOf(Function)
    expect(imagemin.mixin).toBeInstanceOf(Function)
    expect(imagemin.boot).toBeInstanceOf(Function)
  })
})
