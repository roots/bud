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
    expect(stripAnsi(frames.pop())).toBe(Char.Empty)
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

    const lines = stripAnsi(frames.pop()).split(Char.NewLine)

    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock\s\[mock\-hash\]\s+\.\/\.\.\/to$/)
  })

  it(`should render entrypoints`, () => {
    const {frames} = ink.render(
      <Application
        compilations={mockCompilations}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    const lines = stripAnsi(frames.pop()).split(Char.NewLine)

    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)

    expect(startsWith(lines[3], Char.Vertical)).toBe(true)
    expect(lines[3]).toMatch(/ foo/)

    expect(isFormattedAsset(lines[4])).toBe(true)
    expect(lines[4]).toMatch(/\sfoo\.js\s/)

    expect(lines[5]).toBe(Char.Vertical)

    expect(startsWith(lines[6], Char.BottomLeft)).toBe(true)
    expect(lines[6]).toMatch(/2 modules \[2\/2 modules cached\]$/)

    expect(lines[7]).toBe(Char.Empty)
    expect(lines[8]).toBeUndefined()
  })

  it(`should not render entrypoints when entrypoints is empty`, () => {
    const {frames: frames2} = ink.render(
      <Application
        compilations={[{...mockCompilations[0], entrypoints: {}}]}
        displayEntrypoints={true}
        mode="production"
      />,
    )
    const lines = stripAnsi(frames2.pop()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toBe(Char.Vertical)

    expect(startsWith(lines[4], Char.BottomLeft)).toBe(true)
    expect(lines[4]).toMatch(/2 modules \[2\/2 modules cached\]$/)

    expect(lines[5]).toBe(Char.Empty)
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

    const lines = stripAnsi(frames.pop()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/ compilation \[foo\]$/)
    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toBe(Char.Vertical)

    expect(startsWith(lines[4], Char.BottomLeft)).toBe(true)
    expect(lines[4]).toMatch(/...$/)
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
    let lines = stripAnsi(frames.pop()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/ compilation \[foo\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toBe(Char.Vertical)

    expect(startsWith(lines[4], Char.BottomLeft)).toBe(true)
    expect(lines[4]).toMatch(/\.\.\.$/)
    expect(lines[5]).toBe(Char.Empty)

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

    lines = stripAnsi(frames2.pop()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/compilation \[foo\]$/)
    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toBe(Char.Vertical)

    expect(startsWith(lines[4], Char.BottomLeft)).toBe(true)
    expect(lines[4]).toMatch(/.../)

    expect(lines[5]).toBe(Char.Empty)
  })

  it(`should render compilation count for multi-compiler`, () => {
    const {frames} = ink.render(
      <Application
        compilations={[mockCompilations[0], mockCompilations[0]]}
        displayEntrypoints={true}
        mode="production"
      />,
    )

    const lines = stripAnsi(frames.pop()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[1\/2\] \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toMatch(/│ foo/)
    expect(lines[4]).toMatch(/│  › foo.js /)
    expect(lines[5]).toBe(Char.Vertical)

    expect(startsWith(lines[6], Char.BottomLeft)).toBe(true)
    expect(lines[6]).toMatch(/2 modules \[2\/2 modules cached\]$/)
    expect(lines[7]).toBe(Char.Empty)

    expect(startsWith(lines[8], Char.TopLeft)).toBe(true)
    expect(lines[8]).toMatch(/mock \[2\/2\] \[mock\-hash\]$/)

    expect(lines[9]).toBe(Char.Vertical)
    expect(lines[10]).toMatch(/│ foo/)
    expect(lines[11]).toMatch(/│  › foo.js /)
    expect(lines[12]).toBe(Char.Vertical)
    expect(lines[13]).toMatch(/╰ 2 modules \[2\/2 modules cached\]/)
    expect(lines[14]).toBe(Char.Empty)
  })

  it(`should render assets`, () => {
    const {frames} = ink.render(
      <Application
        compilations={mockCompilations}
        displayAssets={true}
        mode="production"
      />,
    )
    const lines = stripAnsi(frames.pop()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)

    expect(startsWith(lines[3], Char.Vertical)).toBe(true)
    expect(lines[3]).toMatch(/│ assets/)

    expect(isFormattedAsset(lines[4])).toBe(true)
    expect(lines[4]).toMatch(/foo.png/)

    expect(lines[5]).toMatch(/│  … 1 additional asset not shown/)
    expect(lines[6]).toBe(Char.Vertical)

    expect(startsWith(lines[7], Char.BottomLeft)).toBe(true)
    expect(lines[7]).toMatch(/2 modules \[2\/2 modules cached\]$/)
    expect(lines[8]).toBe(Char.Empty)
  })

  it(`should render error`, () => {
    const {frames} = ink.render(
      <Application
        compilations={mockCompilationsWithErrors}
        mode="production"
      />,
    )
    const lines = stripAnsi(frames.pop()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toMatch(/│ │ Bad error/)
    expect(lines[4]).toBe(Char.Vertical)

    expect(startsWith(lines[5], Char.BottomLeft)).toBe(true)
    expect(lines[5]).toMatch(/2 modules \[2\/2 modules cached\]$/)
    expect(lines[6]).toBe(Char.Empty)
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

    const lines = stripAnsi(frames.pop()).split(Char.NewLine)
    expect(lines[0]).toBe(Char.Empty)

    expect(startsWith(lines[1], Char.TopLeft)).toBe(true)
    expect(lines[1]).toMatch(/mock \[mock\-hash\]$/)

    expect(lines[2]).toBe(Char.Vertical)
    expect(lines[3]).toMatch(/│ foo/)

    expect(isFormattedAsset(lines[4])).toBe(true)
    expect(lines[4]).toMatch(/foo.js /)
    expect(lines[4]).toMatch(/1 kB$/)

    expect(lines[5]).toBe(Char.Vertical)

    expect(startsWith(lines[6], Char.Vertical)).toBe(true)
    expect(lines[6]).toMatch(/assets$/)

    expect(isFormattedAsset(lines[7])).toBe(true)
    expect(lines[7]).toMatch(/ foo.png /)
    expect(lines[7]).toMatch(/1 kB$/)

    expect(lines[8]).toMatch(/│  … 1 additional asset not shown/)
    expect(lines[9]).toBe(Char.Vertical)

    expect(startsWith(lines[10], Char.BottomLeft)).toBe(true)
    expect(lines[10]).toMatch(/2 modules \[2\/2 modules cached\]$/)

    expect(lines[11]).toBe(Char.Empty)
    expect(lines[12]).toMatch(/Network/)
    expect(lines[14]).toMatch(/ › Proxy  ┄ http:\/\/.+:\d+\//)
    expect(lines[15]).toBe(Char.Empty)
    expect(lines[16]).toMatch(/          ┄ http:\/\/.+/)
    expect(lines[17]).toMatch(/ › dev    ┄ http:\/\/.+\//)
    expect(lines[18]).toMatch(
      /          ┄ http:\/\/\d+\.\d+\.\d+\.\d+:\d+\//,
    )
    expect(lines[19]).toMatch(/          ┄ http:\/\/.+:\d+\//)
    expect(lines[20]).toBe(Char.Empty)
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
    const lines = stripAnsi(frames.pop()).split(Char.NewLine)
    expect(lines[14]).toMatch(/ › dev    ┄ http:\/\/.+:\d+\//)
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
