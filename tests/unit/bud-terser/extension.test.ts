import {Bud, factory} from '@repo/test-kit/bud'
import * as BudTerser from '@roots/bud-terser'

describe('@roots/bud-terser', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('has name prop', () => {
    expect(BudTerser.name).toBe('@roots/bud-terser')
  })

  it('has api prop', () => {
    expect(BudTerser.api).toBeInstanceOf(Object)
  })

  it('has options prop', () => {
    expect(BudTerser.options).toBeInstanceOf(Function)
  })

  it('has boot prop', () => {
    expect(BudTerser.boot).toBeInstanceOf(Function)
  })

  it('binds the bud.terser function', async () => {
    await bud.extensions.add([BudTerser])
    expect(bud.terser).toBeInstanceOf(Function)
  })
})
