/* eslint-disable n/no-extraneous-import */
import {factory} from '@repo/test-kit/bud'
import {describe, expect, it, vi} from 'vitest'

import {use as subject} from './index.js'

describe(`use`, () => {
  it(`is a function`, async () => {
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const use = subject.bind(bud)

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })
    expect(use).toBeInstanceOf(Function)
  })

  it(`returns bud`, async () => {
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const use = subject.bind(bud)

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })
    expect(
      await use(
        // @ts-ignore
        {label: `foo`},
      ),
    ).toBe(bud)
  })

  it(`registers an imported extension`, async () => {
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const use = subject.bind(bud)

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })
    // @ts-ignore
    await use(`@roots/bud-babel`)
    expect(
      bud.extensions.has(
        // @ts-ignore
        `@roots/bud-babel`,
      ),
    ).toBe(true)
  })

  it(`registers an inline extension`, async () => {
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const use = subject.bind(bud)

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })

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
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const addSpy = vi.spyOn(bud.extensions, `add`)

    const use = subject.bind(bud)

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })
    await use({options: {}})

    expect(addSpy).toHaveBeenCalledTimes(2)
  })

  it(`registers a webpack plugin`, async () => {
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const use = subject.bind(bud)

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })

    await use(`@roots/bud-extensions/html-webpack-plugin`)

    expect(
      bud.extensions.has(`@roots/bud-extensions/html-webpack-plugin`),
    ).toBe(true)
  })

  it.skip(`registers an inline webpack plugin`, async () => {
    const bud = await factory()

    const use = subject.bind(bud)

    bud.extensions.repository = {} as any // reset extensions

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })

    expect(Object.keys(bud.extensions.repository)).toHaveLength(2)
  })

  it(`registers an imported webpack plugin`, async () => {
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const use = subject.bind(bud)

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })
    await use(`@roots/bud-extensions/html-webpack-plugin`)
    expect(
      bud.extensions.has(`@roots/bud-extensions/html-webpack-plugin`),
    ).toBe(true)
  })

  it(`registers multiple extensions`, async () => {
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const use = subject.bind(bud)

    await use([
      {
        // @ts-ignore
        label: `css-minimizer-webpack-plugin`,
        options: {},
      },
      `@roots/bud-extensions/html-webpack-plugin`,
    ])
    expect(
      bud.extensions.has(
        // @ts-ignore
        `css-minimizer-webpack-plugin`,
      ),
    ).toBe(true)
    expect(
      bud.extensions.has(`@roots/bud-extensions/html-webpack-plugin`),
    ).toBe(true)
  })

  it(`adds an apply plugin to the config`, async () => {
    const bud = await factory()

    bud.extensions.repository = {} as any // reset extensions

    const use = subject.bind(bud)

    await use({
      // @ts-ignore
      label: `css-minimizer-webpack-plugin`,
      options: {},
    })

    const plugin = {
      // @ts-ignore
      label: `my-plugin`,
      apply() {
        // noop
      },
    }

    await use(plugin)
    expect(
      bud.extensions.has(
        // @ts-ignore
        `my-plugin`,
      ),
    ).toBe(true)
  })
})
