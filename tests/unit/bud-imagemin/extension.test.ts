import * as imagemin from '@roots/bud-imagemin'

describe('@roots/bud-imagemin', () => {
  it('has expected exports', () => {
    expect(imagemin.name).toBe('@roots/bud-imagemin')
    // @ts-ignore
    expect(imagemin.api.imagemin).toBeInstanceOf(Function)
    expect(imagemin.boot).toBeInstanceOf(Function)
  })
})
