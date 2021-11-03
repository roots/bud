import imagemin from '@roots/bud-imagemin'

describe('@roots/bud-imagemin', () => {
  it('has expected exports', () => {
    expect(imagemin.name).toBe('@roots/bud-imagemin')
    expect(imagemin.api).toBeInstanceOf(Function)
    expect(imagemin.register).toBeInstanceOf(Function)
    expect(imagemin.boot).toBeInstanceOf(Object)
  })
})
