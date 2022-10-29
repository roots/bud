/* eslint-disable n/no-extraneous-import */
import {Bud, factory} from '@repo/test-kit/bud'
import Babel from '@roots/bud-babel'

import {use as subject} from './index'

describe(`use`, function () {
  let bud: Bud
  let use: subject

  beforeEach(async () => {
    bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    use = subject.bind(bud)

    await use(
      // @ts-ignore
      {
        label: `css-minimizer-webpack-plugin`,
        options: {},
      },
    )
  })

  it(`is a function`, () => {
    expect(use).toBeInstanceOf(Function)
  })

  it(`returns bud`, async () => {
    expect(
      await use(
        // @ts-ignore
        {label: `foo`},
      ),
    ).toBe(bud)
  })

  it(`registers an imported extension`, async () => {
    await use(`@roots/bud-babel`)
    expect(bud.extensions.has(`@roots/bud-babel`))
  })

  it(`registers an inline extension`, async () => {
    await use(
      // @ts-ignore
      {label: `inline-extension`},
    )
    expect(
      bud.extensions.has(
        // @ts-ignore
        `inline-extension`,
      ),
    )
  })

  it(`registers an anonymous extension`, async () => {
    await use({options: {}})
    expect(Object.keys(bud.extensions.repository).length).toEqual(2)
  })

  it(`registers a webpack plugin`, async () => {
    await use(`@roots/bud-extensions/html-webpack-plugin`)
    expect(
      bud.extensions.has(`@roots/bud-extensions/html-webpack-plugin`),
    ).toBe(true)
  })

  it(`registers an inline webpack plugin`, async () => {
    await use({apply() {}})
    expect(Object.keys(bud.extensions.repository).length).toEqual(2)
  })

  it(`registers an imported webpack plugin`, async () => {
    await use(`@roots/bud-extensions/html-webpack-plugin`)
    expect(
      bud.extensions.has(`@roots/bud-extensions/html-webpack-plugin`),
    ).toBe(true)
  })

  it(`registers multiple extensions`, async () => {
    await use([Babel, `@roots/bud-extensions/html-webpack-plugin`])
    expect(bud.extensions.has(`@roots/bud-babel`)).toBe(true)
    expect(
      bud.extensions.has(`@roots/bud-extensions/html-webpack-plugin`),
    ).toBe(true)
  })

  it(`adds an apply plugin to the config`, async () => {
    const plugin = {
      label: `my-plugin`,
      apply() {
        // noop
      },
    }

    await use(
      // @ts-ignore
      plugin,
    )
    expect(
      bud.extensions.has(
        // @ts-ignore
        `my-plugin`,
      ),
    ).toBe(true)
  })
})
