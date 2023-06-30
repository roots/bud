import React from '@roots/bud-support/ink'
// @ts-ignore
import {render} from 'ink-testing-library'
import {describe, expect, it} from 'vitest'

import {Application} from '../src/dashboard/app'
import {StatsCompilation} from 'webpack'

const mockCompilations: Array<Partial<StatsCompilation>> = [
  {
    name: `mock`,
    assets: [
      {
        type: `asset`,
        name: `foo.js`,
        info: {},
        size: 1000,
        emitted: true,
        comparedForEmit: true,
        cached: true,
      },
      {
        type: `asset`,
        name: `foo.png`,
        info: {},
        size: 1000,
        emitted: true,
        comparedForEmit: true,
        cached: true,
      },
    ],
    entrypoints: {
      foo: {
        name: `foo`,
        assets: [{name: `foo.js`}],
      },
    },
    errors: [],
    modules: [],
    warnings: [],
    errorCount: 0,
    warningCount: 0,
  },
]

describe(`@roots/bud-dashboard app component`, () => {
  it(`should render status`, () => {
    const result = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        status="testing status"
      />,
    )

    expect(result.lastFrame()).toMatchInlineSnapshot(`
      "
      [2m.   testing status[22m
      "
    `)

    result.rerender(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        status="testing status 2"
      />,
    )

    expect(result.lastFrame()).toMatchInlineSnapshot(`
      "
      [2m.   testing status 2[22m
      "
    `)
  })

  it(`should render entrypoints`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={mockCompilations}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toMatchInlineSnapshot(`
      "
      [32m╭[39m[32m─[39m [32m☰[39m [32mmock[39m
      [32m│[39m
      [32m│[39m [2m╭[22m[2m─[22m [36mfoo[39m
      [32m│[39m [2m│[22m
      [32m│[39m [2m│[22m › foo.js                                                                                    [2m1 kB[22m
      [32m│[39m [2m│[22m
      [32m│[39m [2m╰[22m[2m─[22m [2mundefined bytes[22m
      [32m│[39m
      [32m╰[39m[32m─[39m [2m...[22m
      "
    `)
  })

  it(`should not render entrypoints when entrypoints are undefined`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[{...mockCompilations[0], entrypoints: {}}]}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toMatchInlineSnapshot(`
      "
      [32m╭[39m[32m─[39m [32m☰[39m [32mmock[39m
      [32m│[39m
      [32m│[39m
      [32m╰[39m[32m─[39m [2m...[22m
      "
    `)
  })

  it(`should not render entrypoints when entrypoints are undefined`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[{entrypoints: false}]}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toMatchInlineSnapshot(`
      "
      [32m╭[39m[32m─[39m [32m☰[39m [32mcompilation[39m
      [32m│[39m
      [32m│[39m
      [32m╰[39m[32m─[39m [2m...[22m
      "
    `)
  })

  it(`should not render entrypoints when entrypoint assets are undefined`, () => {
    const ink = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[
          {
            entrypoints: {
              foo: {assets: [null]},
            },
          },
        ]}
        displayEntrypoints={true}
      />,
    )

    expect(ink.lastFrame()).toMatchInlineSnapshot(`
      "
      [32m╭[39m[32m─[39m [32m☰[39m [32mcompilation[39m
      [32m│[39m
      [32m│[39m [2m╭[22m[2m─[22m
      [32m│[39m [2m│[22m
      [32m│[39m [2m│[22m [2m≈ [22m                                                                               [2mundefined bytes[22m
      [32m│[39m [2m│[22m
      [32m│[39m [2m╰[22m[2m─[22m [2mundefined bytes[22m
      [32m│[39m
      [32m╰[39m[32m─[39m [2m...[22m
      "
    `)

    ink.rerender(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[
          {
            entrypoints: {
              foo: {},
            },
          },
        ]}
        displayEntrypoints={true}
      />,
    )

    expect(ink.lastFrame()).toMatchInlineSnapshot(`
      "
      [32m╭[39m[32m─[39m [32m☰[39m [32mcompilation[39m
      [32m│[39m
      [32m│[39m [2m╭[22m[2m─[22m
      [32m│[39m [2m│[22m
      [32m│[39m [2m│[22m
      [32m│[39m [2m╰[22m[2m─[22m [2mundefined bytes[22m
      [32m│[39m
      [32m╰[39m[32m─[39m [2m...[22m
      "
    `)
  })

  it(`should not render compilation count for multi-compiler`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={[mockCompilations[0], mockCompilations[0]]}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toMatchInlineSnapshot(`
      "
      [32m╭[39m[32m─[39m [32m☰[39m [32mmock[39m [2m[1/2][22m
      [32m│[39m
      [32m│[39m [2m╭[22m[2m─[22m [36mfoo[39m
      [32m│[39m [2m│[22m
      [32m│[39m [2m│[22m › foo.js                                                                                    [2m1 kB[22m
      [32m│[39m [2m│[22m
      [32m│[39m [2m╰[22m[2m─[22m [2mundefined bytes[22m
      [32m│[39m
      [32m╰[39m[32m─[39m [2m...[22m

      [32m╭[39m[32m─[39m [32m☰[39m [32mmock[39m [2m[2/2][22m
      [32m│[39m
      [32m│[39m [2m╭[22m[2m─[22m [36mfoo[39m
      [32m│[39m [2m│[22m
      [32m│[39m [2m│[22m › foo.js                                                                                    [2m1 kB[22m
      [32m│[39m [2m│[22m
      [32m│[39m [2m╰[22m[2m─[22m [2mundefined bytes[22m
      [32m│[39m
      [32m╰[39m[32m─[39m [2m...[22m
      "
    `)
  })

  it(`should render assets`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="production"
        compilations={mockCompilations}
        displayAssets={true}
      />,
    )

    expect(lastFrame()).toMatchInlineSnapshot(`
      "
      [32m╭[39m[32m─[39m [32m☰[39m [32mmock[39m
      [32m│[39m
      [32m│[39m [2m╭[22m[2m─[22m [36massets[39m
      [32m│[39m [2m│[22m
      [32m│[39m [2m│[22m › foo.png                                                                                   [2m1 kB[22m
      [32m│[39m [2m│[22m
      [32m│[39m [2m╰[22m[2m─[22m [2m1 kB[22m
      [32m│[39m
      [32m╰[39m[32m─[39m [2m...[22m
      "
    `)
  })

  it(`should render server info`, () => {
    const {lastFrame} = render(
      <Application
        basedir={`/foo/bar`}
        mode="development"
        devUrl={new URL(`http://localhost:3000`)}
        publicDevUrl={new URL(`http://example.test:3000/`)}
        proxy={true}
        proxyUrl={new URL(`http://localhost:8080/`)}
        publicProxyUrl={new URL(`http://example.test/`)}
        displayServerInfo={true}
        displayAssets={true}
        displayEntrypoints={true}
      />,
    )

    expect(lastFrame()).toMatchInlineSnapshot(`
      "
      [34m╭[39m[34m─[39m [34m⬢ Server info[39m
      [34m│[39m
      [34m│[39m  [37mproxy[39m  [2m┄ http://localhost:8080/[22m
      [34m│[39m
      [34m│[39m         [2m┄ http://example.test/[22m
      [34m│[39m
      [34m│[39m  [37mdev[39m    [2m┄ http://localhost:3000/[22m
      [34m│[39m         [2m┄ http://192.168.1.16:3000/[22m
      [34m│[39m         [2m┄ http://example.test:3000/[22m
      [34m│[39m
      [34m╰[39m[34m─[39m Watching project sources
      "
    `)
  })
})
