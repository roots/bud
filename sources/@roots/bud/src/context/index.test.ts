import {paths} from '@repo/constants'
import {join} from 'node:path'
import {beforeAll, describe, expect, it} from 'vitest'
import {Context} from '@roots/bud-framework/options'

import getContext from './index.js'

describe(`context.get`, () => {
  let context: Context

  beforeAll(async () => {
    context = await getContext(
      join(paths.root, `tests`, `util`, `project`),
      true,
    )
  })

  it(`should be accessible`, () => {
    expect(context).toBeDefined()
  })

  it(`should match expectations`, async () => {
    expect(context.args).toEqual(
      expect.objectContaining({
        basedir: expect.any(String),
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
      }),
    )

    expect(context.basedir).toEqual(expect.stringMatching(/\/project$/))
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
    expect(context.manifest.bud).toMatchSnapshot()
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

  it(`has expected context.config`, () => {
    expect(context.config).toEqual(
      expect.objectContaining({
        '.eslintrc.js': expect.any(Object),
        'bud.config.mjs': expect.any(Object),
        'docker-compose.yml': expect.any(Object),
        'package.json': expect.any(Object),
        'tailwind.config.cjs': expect.any(Object),
        'tsconfig.json': expect.any(Object),
      }),
    )
  })
})
