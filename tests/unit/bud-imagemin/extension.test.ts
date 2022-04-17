import * as imagemin from '@roots/bud-imagemin'

describe('@roots/bud-imagemin', () => {
  it('has expected exports', () => {
    expect(imagemin.label).toBe('@roots/bud-imagemin')
    expect(imagemin.boot).toBeInstanceOf(Function)
  })
})
