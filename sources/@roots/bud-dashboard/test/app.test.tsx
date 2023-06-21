import React from '@roots/bud-support/ink'
import {Bud, factory} from '@repo/test-kit'
// @ts-ignore
import {render} from 'ink-testing-library'
import {beforeEach, describe, expect, it} from 'vitest'

import {Application} from '../src/dashboard/app.js'

const mockCompilations = [
  {
    assets: [],
    entrypoints: {},
    errors: [],
    modules: [],
    warnings: [],
  },
]

describe(`@roots/bud-dashboard app component`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`should render stats`, () => {
    const {lastFrame} = render(
      <Application
        context={bud.context}
        debug={false}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`✔`)
  })

  it(`should render server info`, () => {
    const {lastFrame} = render(
      <Application
        context={bud.context}
        debug={false}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxy={true}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`:3000/`)
    expect(lastFrame()).toContain(`:8080/`)
  })

  it(`should render watch list`, () => {
    const {lastFrame} = render(
      <Application
        context={bud.context}
        debug={false}
        mode="development"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toContain(`Watching project sources`)
  })

  it(`should not render watch list in prod`, () => {
    const {lastFrame} = render(
      <Application
        context={bud.context}
        debug={false}
        mode="production"
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        proxyUrl={new URL(`http://localhost:8080`)}
        watchFiles={new Set([`foo`])}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).not.toContain(`Watching project sources`)
  })
})
