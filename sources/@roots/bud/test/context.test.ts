import {path} from '@repo/constants'
import {beforeEach, describe, expect, it} from 'vitest'
import {Context} from '@roots/bud-framework/context'

import getContext from '../src/context/index.js'

describe(`context.get`, () => {
  let context: Context

  beforeEach(async () => {
    context = await getContext({
      basedir: path(`tests`, `util`, `project`),
    })
  })

  it(`should be accessible`, () => {
    expect(context).toBeDefined()
  })

  it(`should match expectations`, async () => {
    expect(context.basedir).toEqual(expect.stringMatching(/\/project$/))
    expect(context.bud).toEqual(
      expect.objectContaining({
        label: `bud`,
        manifestPath: expect.stringMatching(/\/package.json$/),
        version: expect.stringMatching(/^\d+\.\d+\.\d+$/),
      }),
    )
    expect(context.extensions.builtIn).toEqual(
      expect.arrayContaining([
        `@roots/bud-minify`,
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
    expect(context.mode).toBe(`production`)
    expect(context.services).toEqual(
      expect.arrayContaining([
        `@roots/bud-framework/env`,
        `@roots/bud-hooks`,
        `@roots/bud-api`,
        `@roots/bud-build`,
        `@roots/bud-cache`,
        `@roots/bud-compiler`,
        `@roots/bud-dashboard`,
        `@roots/bud-extensions`,
        `@roots/bud-server`,
        `@roots/bud-framework/project`,
      ]),
    )
  })

  it(`has expected context.files`, () => {
    expect(context.files).toEqual(
      expect.objectContaining({
        'bud.config': expect.any(Object),
        package: expect.any(Object),
        tsconfig: expect.any(Object),
      }),
    )
  })
})
