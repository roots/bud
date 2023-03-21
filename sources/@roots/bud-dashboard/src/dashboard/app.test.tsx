import {factory} from '@repo/test-kit/bud'
import {render} from 'ink-testing-library'
import {beforeEach, describe, expect, it} from 'vitest'

import App from './app.js'

const mockCompilations = [
  {
    assets: [],
    entrypoints: {},
    errors: [],
  },
]

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
        publicDevUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        publicProxyUrl={new URL(`http://localhost:8080`)}
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
        publicDevUrl={new URL(`http://example.test`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        publicProxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`proxy`)
  })

  it(`should render server info`, async () => {
    const {lastFrame} = render(
      // @ts-ignore
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        publicDevUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        publicProxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        isTTY={true}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`proxy`)
    expect(lastFrame()).toContain(`dev`)
    expect(lastFrame()).not.toContain(`internal`)
    expect(lastFrame()).not.toContain(`external`)
  })

  it(`should render watch list`, async () => {
    const {lastFrame} = render(
      <App
        context={bud.context}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        publicDevUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        publicProxyUrl={new URL(`http://localhost:8080`)}
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
        publicDevUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        publicProxyUrl={new URL(`http://localhost:8080`)}
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
