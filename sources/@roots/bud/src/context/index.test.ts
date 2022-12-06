import {describe, expect, it} from 'vitest'

import {get} from './index.js'

describe(`context.get`, () => {
  it(`should be accessible`, () => {
    expect(get).toBeDefined()
  })

  it(`should be a function`, () => {
    expect(get).toBeInstanceOf(Function)
  })

  it(`should return a promise`, async () => {
    expect(get(process.cwd())).toBeInstanceOf(Promise)
  })

  it(`should resolve to an object`, async () => {
    expect(await get(process.cwd())).toBeInstanceOf(Object)
  })

  it(`should match expectations`, async () => {
    const context = await get(process.cwd())
    expect(context.args).toMatchSnapshot({
      basedir: null,
      browser: undefined,
      cache: undefined,
      ci: undefined,
      clean: undefined,
      debug: undefined,
      devtool: undefined,
      discovery: undefined,
      dry: undefined,
      editor: undefined,
      esm: undefined,
      flush: undefined,
      hash: undefined,
      html: undefined,
      immutable: undefined,
      indicator: undefined,
      input: undefined,
      level: undefined,
      log: undefined,
      manifest: undefined,
      minimize: undefined,
      mode: undefined,
      notify: true,
      output: undefined,
      overlay: undefined,
      publicPath: undefined,
      reload: undefined,
      splitChunks: undefined,
      target: undefined,
    })

    expect(context.basedir).toEqual(expect.stringMatching(/\/bud$/))
    expect(context.bud).toEqual(
      expect.objectContaining({
        basedir: expect.stringMatching(/\/bud$/),
        label: `bud`,
        manifestPath: expect.stringMatching(/\/package.json$/),
        version: `0.0.0`,
      }),
    )
    expect(context.colorDepth).toEqual(256)
    expect(context.extensions.builtIn).toEqual(
      expect.arrayContaining([
        `@roots/bud-terser`,
        `@roots/bud-extensions/cdn`,
        `@roots/bud-extensions/esm`,
        `@roots/bud-extensions/fix-style-only-entrypoints`,
        `@roots/bud-extensions/clean-webpack-plugin`,
        `@roots/bud-extensions/webpack-provide-plugin`,
        `@roots/bud-extensions/webpack-manifest-plugin`,
        `@roots/bud-extensions/webpack-hot-module-replacement-plugin`,
        `@roots/bud-extensions/webpack-define-plugin`,
        `@roots/bud-extensions/mini-css-extract-plugin`,
        `@roots/bud-extensions/copy-webpack-plugin`,
        `@roots/bud-extensions/webpack-define-plugin`,
      ]),
    )
    expect(context.manifest).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        packageManager: expect.any(String),
        private: true,
        description: expect.any(String),
        repository: {
          type: expect.any(String),
          url: expect.any(String),
        },
        license: expect.any(String),
        engines: {
          node: expect.any(String),
        },
        volta: {
          node: expect.any(String),
          yarn: expect.any(String),
          npm: expect.any(String),
        },
        workspaces: expect.objectContaining({
          packages: expect.arrayContaining([
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ]),
        }),
        type: `module`,
        dependencies: expect.any(Object),
        devDependencies: expect.any(Object),
      }),
    )
    expect(context.mode).toBe(null)
    expect(context.services).toEqual(
      expect.arrayContaining([
        `@roots/bud/services/env`,
        `@roots/bud-hooks`,
        `@roots/bud-api`,
        `@roots/bud-build`,
        `@roots/bud-cache`,
        `@roots/bud-compiler`,
        `@roots/bud-dashboard`,
        `@roots/bud-extensions`,
        `@roots/bud-server`,
        `@roots/bud/services/project`,
      ]),
    )
  })
})
