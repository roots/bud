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

  it(`registers prop: name`, () =>
    expect(bud.extensions.get('@roots/bud-react').get('name')).toBe(
      BudReact.name,
    ))

  it(`registers prop: api`, () =>
    expect(bud.extensions.get('@roots/bud-react').get('api')).toBe(
      BudReact.api,
    ))

  it(`registers prop: boot`, () =>
    expect(bud.extensions.get('@roots/bud-react').get('boot')).toBe(
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
