import '@roots/bud-babel'

import {Bud, factory} from '@repo/test-kit/bud'
import BudReact from '@roots/bud-react'
import BudReactRefresh from '@roots/bud-react/react-refresh/extension'

const extensionIdentifier = `@roots/bud-react`

describe(extensionIdentifier, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(BudReact)
  })

  it(`is registrable`, () => {
    expect(bud.extensions.has(extensionIdentifier)).toBeTruthy()
  })

  it(`registers prop: label`, () =>
    expect(bud.extensions.get(extensionIdentifier).label).toBe(
      extensionIdentifier,
    ))

  it(`registers prop: configAfter`, () =>
    expect(
      bud.extensions.get(extensionIdentifier).configAfter,
    ).toBeInstanceOf(Function))

  it(`regissters fn: react-refresh`, async () => {
    expect(bud.react.refresh).toBeInstanceOf(BudReactRefresh)
  })
})
