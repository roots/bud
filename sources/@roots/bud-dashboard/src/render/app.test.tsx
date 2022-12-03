import {Bud, factory} from '@repo/test-kit/bud'
import React from '@roots/bud-support/react'
import {render} from 'ink-testing-library'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import App from './app'

const mockCompilations = [{}]

describe(`@roots/bud-dashboard app component`, () => {
  let bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`should render stats`, async () => {
    const {lastFrame} = render(
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`compiled  modules`)
  })

  it(`should render server info`, async () => {
    const {lastFrame} = render(
      // @ts-ignore
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`proxy`)
    expect(lastFrame()).toContain(`internal`)
    expect(lastFrame()).toContain(`external`)
  })

  it(`should render messages`, async () => {
    const {lastFrame} = render(
      // @ts-ignore
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
        messages={{stdout: [`stdout message`], stderr: []}}
      />,
    )

    expect(lastFrame().split(`\n`)[1]).toMatchInlineSnapshot(`
      "[32m[stdout][39m stdout message"
    `)
  })

  it(`should render watch list`, async () => {
    const {lastFrame} = render(
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`watching project sources`)
  })

  it(`should not render watch list in prod`, async () => {
    const {lastFrame} = render(
      <App
        context={bud.context}
        mode="production"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).not.toContain(`watching project sources`)
  })
})
