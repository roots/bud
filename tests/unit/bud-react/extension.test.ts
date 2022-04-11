import '@roots/bud-babel'

import {Bud, factory} from '@repo/test-kit/bud'
import * as BudReact from '@roots/bud-react'

describe('@roots/bud-react', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()

    await bud.extensions.add(BudReact)
  })

  it('is registrable', () => {
    expect(bud.extensions.has('@roots/bud-react')).toBeTruthy()
  })

  it(`registers prop: label`, () =>
    expect(bud.extensions.get('@roots/bud-react').get('label')).toBe(
      BudReact.label,
    ))

  it(`registers prop: register`, () =>
    expect(bud.extensions.get('@roots/bud-react')._module.register).toBe(
      BudReact.register,
    ))

  it(`registers prop: boot`, () =>
    expect(bud.extensions.get('@roots/bud-react')._module.boot).toBe(
      BudReact.boot,
    ))

  it('regissters fn: react-refresh', async () => {
    expect(bud.reactRefresh).toBeInstanceOf(Function)
  })

  it('adds babel plugin', async () => {
    const babelPresetPath = require.resolve('@babel/preset-react')
    expect(bud.babel.presets['@babel/preset-react'].shift()).toBe(
      babelPresetPath,
    )
  })
})
