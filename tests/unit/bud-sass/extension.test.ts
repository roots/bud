import * as BudSass from '@roots/bud-sass/src/index'
import {extension} from '@roots/bud-sass/src/sass.extension'

describe('@roots/bud-sass', () => {
  it('has @roots/bud-sass name', () => {
    expect(BudSass.label).toBe('@roots/bud-sass')
  })
  it('has boot fn', () => {
    expect(BudSass.boot).toBeInstanceOf(Function)
  })

  it('has register fn', () => {
    expect(BudSass.register).toBeInstanceOf(Function)
  })

  it('has @roots/bud-sass name', () => {
    expect(BudSass.label).toBe(extension.label)
  })
  it('has boot fn', () => {
    expect(BudSass.boot).toBe(extension.boot)
  })

  it('has register fn', () => {
    expect(BudSass.register).toBe(extension.register)
  })
})
