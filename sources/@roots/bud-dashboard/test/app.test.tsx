import React from '@roots/bud-support/ink'
import stripAnsi from '@roots/bud-support/strip-ansi'
// @ts-ignore
import * as ink from 'ink-testing-library'
import {describe, expect, it} from 'vitest'
import {StatsCompilation} from 'webpack'

import {Application} from '../src/application.js'

const enum Char {
  BottomLeft = `╰`,
  BottomRight = `╯`,
  Empty = ``,
  Horizontal = `─`,
  NewLine = `\n`,
  Space = ` `,
  TopLeft = `╭`,
  TopRight = `╮`,
  Vertical = `│`,
}

const startsWith = (line: string, char: Char) =>
  new RegExp(`^${char}`).test(line)

const isFormattedAsset = (line: string) =>
  startsWith(line, Char.Vertical) && /›\s*/.test(line)

const mockCompilations: Array<Partial<StatsCompilation>> = [
  {
    assets: [
      {
        cached: true,
        comparedForEmit: true,
        emitted: true,
        info: {},
        name: `foo.js`,
        size: 1000,
        type: `asset`,
      },
      {
        cached: true,
        comparedForEmit: true,
        emitted: true,
        info: {},
        name: `foo.png`,
        size: 1000,
        type: `asset`,
      },
    ],
    entrypoints: {
      foo: {
        assets: [{name: `foo.js`}],
        name: `foo`,
      },
    },
    errors: [],
    errorsCount: 0,
    hash: `mock-hash`,
    modules: [
      {
        cached: true,
        comparedForEmit: true,
        emitted: true,
        info: {},
        name: `foo.js`,
        size: 1000,
        type: `asset`,
      },
      {
        cached: true,
        comparedForEmit: true,
        emitted: true,
        info: {},
        name: `foo.png`,
        size: 1000,
        type: `asset`,
      },
    ],
    name: `mock`,
    outputPath: `/path/mock/to`,
    warnings: [],
    warningsCount: 0,
  },
]

const mockCompilationsWithErrors: Array<Partial<StatsCompilation>> = [
  {
    ...mockCompilations[0],
    errors: [new Error(`Bad error`)],
  },
]

describe(`@roots/bud-dashboard app component`, () => {
  it(`should not render without a hash`, () => {
    const {frames} = ink.render(
      // @ts-ignore
      <Application compilations={[]} />,
    )
    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`""`)
  })

  it(`should render basedir when basedir prop and compilation.outputPath are set`, () => {
    const {frames} = ink.render(
      <Application
        compilations={[
          {
            assets: [
              {
                cached: true,
                comparedForEmit: true,
                emitted: true,
                info: {},
                name: `foo.js`,
                size: 1000,
                type: `asset`,
              },
              {
                cached: true,
                comparedForEmit: true,
                emitted: true,
                info: {},
                name: `foo.png`,
                size: 1000,
                type: `asset`,
              },
            ],
            entrypoints: {
              foo: {
                assets: [{name: `foo.js`, size: 100}],
                name: `foo`,
              },
            },
            errors: [],
            errorsCount: 0,
            hash: `mock-hash`,
            modules: [],
            name: `mock`,
            outputPath: `/path/mock/to`,
            warnings: [],
            warningsCount: 0,
          },
        ]}
        basedir={`/path/mock/from`}
        mode="production"
      />,
    )

    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]                                                                         ./../to
      │
      │
      ╰ 0 modules [0/0 modules cached]
      "
    `)
  })

  it(`should render entrypoints`, () => {
    const {frames} = ink.render(
      <Application
        compilations={mockCompilations}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │ foo
      │  ◉ foo.js                                                                                   1 kB
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should not render entrypoints when entrypoints is empty`, () => {
    const {frames} = ink.render(
      <Application
        compilations={[{...mockCompilations[0], entrypoints: {}}]}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should not render entrypoints when entrypoints are undefined`, () => {
    const {frames} = ink.render(
      <Application
        // @ts-ignore
        compilations={[{entrypoints: false, hash: `foo`}]}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ compilation [foo]
      │
      │
      ╰ ...
      "
    `)
  })

  it(`should not render entrypoints when entrypoint assets are undefined`, () => {
    const {frames} = ink.render(
      <Application
        compilations={[
          {
            entrypoints: {
              foo: {assets: []},
            },
            hash: `foo`,
          },
        ]}
        basedir={`/foo/bar`}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ compilation [foo]
      │
      │
      ╰ ...
      "
    `)

    const {frames: frames2} = ink.render(
      <Application
        compilations={[
          {
            entrypoints: {
              foo: {},
            },
            hash: `foo`,
          },
        ]}
        basedir={`/foo/bar`}
        displayEntrypoints={true}
        mode="production"
      />,
    )

    expect(stripAnsi(frames2.pop())).toMatchInlineSnapshot(`
      "
      ╭ compilation [foo]
      │
      │
      ╰ ...
      "
    `)
  })

  it(`should render compilation count for multi-compiler`, () => {
    const {frames} = ink.render(
      <Application
        compilations={[mockCompilations[0], mockCompilations[0]]}
        displayEntrypoints={true}
        mode="production"
      />,
    )


    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ mock [1/2] [mock-hash]
      │
      │ foo
      │  ◉ foo.js                                                                                   1 kB
      │
      ╰ 2 modules [2/2 modules cached]

      ╭ mock [2/2] [mock-hash]
      │
      │ foo
      │  ◉ foo.js                                                                                   1 kB
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should render assets`, () => {
    const {frames} = ink.render(
      <Application
        compilations={mockCompilations}
        displayAssets={true}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │ assets
      │  ◉ foo.png                                                                                  1 kB
      │  … 1 additional asset not shown
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should render error`, () => {
    const {frames} = ink.render(
      <Application
        compilations={mockCompilationsWithErrors}
        mode="production"
      />,
    )
    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │ │ Bad error
      │
      ╰ 2 modules [2/2 modules cached]
      "
    `)
  })

  it(`should render server info`, () => {
    const {frames} = ink.render(
      <Application
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        displayAssets={true}
        displayEntrypoints={true}
        displayServerInfo={true}
        mode="development"
        proxy={true}
        proxyUrl={new URL(`http://localhost:8080/`)}
        publicDevUrl={new URL(`http://example.test:3000/`)}
        publicProxyUrl={new URL(`http://example.test/`)}
      />,
    )

    expect(stripAnsi(frames.pop())).toMatchInlineSnapshot(`
      "
      ╭ mock [mock-hash]
      │
      │ foo
      │  ◉ foo.js                                                                                   1 kB
      │
      │ assets
      │  ◉ foo.png                                                                                  1 kB
      │  … 1 additional asset not shown
      │
      ╰ 2 modules [2/2 modules cached]

      Network

       › Proxy  ┄ http://localhost:8080/

                ┄ http://example.test/
       › Dev    ┄ http://localhost:3000/
                ┄ http://192.168.1.16:3000/
                ┄ http://example.test:3000/"
    `)
  })

  it(`should not render proxy info when proxy not set`, () => {
    const {frames} = ink.render(
      <Application
        basedir={`/foo/bar`}
        compilations={mockCompilations}
        devUrl={new URL(`http://localhost:3000`)}
        displayAssets={true}
        displayEntrypoints={true}
        displayServerInfo={true}
        mode="development"
        proxy={false}
        proxyUrl={new URL(`http://localhost:8080/`)}
        publicDevUrl={new URL(`http://example.test:3000/`)}
        publicProxyUrl={new URL(`http://example.test/`)}
      />,
    )
    expect(stripAnsi(frames.pop())).not.toMatch(/.*Proxy.*/)
  })

  it(`should not throw when crazy input happens`, () => {
    const {lastFrame: basedirNumber} = ink.render(
      // @ts-ignore
      <Application basedir={6} />,
    )
    expect(basedirNumber()).toBe(Char.Empty)

    const {lastFrame: compilationTypeStringArray} = ink.render(
      // @ts-ignore
      <Application compilations={[`foo`]} />,
    )
    expect(stripAnsi(compilationTypeStringArray())).toBe(Char.Empty)

    const {lastFrame: compilationTypeNumberArray} = ink.render(
      // @ts-ignore
      <Application compilations={[1]} />,
    )
    expect(stripAnsi(compilationTypeNumberArray())).toBe(Char.Empty)

    const {lastFrame: compilationTypeString} = ink.render(
      // @ts-ignore
      <Application compilations={`foo`} />,
    )
    expect(stripAnsi(compilationTypeString())).toBe(Char.Empty)
  })
})
