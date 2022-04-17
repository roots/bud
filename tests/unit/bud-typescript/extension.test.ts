import '@roots/bud-postcss'

import {Bud, factory} from '@repo/test-kit/bud'
import BudBabel from '@roots/bud-babel'
import * as BudTypescript from '@roots/bud-typescript'

describe('@roots/bud-typescript', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(async () => {
    bud.extensions.setStore({})
    bud.use([new BudBabel(() => bud), BudTypescript])
    await bud.api.processQueue()
  })

  it('label', () => {
    expect(bud.extensions.get('@roots/bud-typescript').label).toBe(
      '@roots/bud-typescript',
    )
  })

  it('provides callable typecheck method', async () => {
    const result = await bud.api.call('typecheck')
    expect(result).toBeInstanceOf(Bud)
  })

  it('enables typechecking when called with true', async () => {
    await bud.api.call('typecheck', true)
    expect(
      bud.extensions.has('fork-ts-checker-webpack-plugin'),
    ).toBeTruthy()
  })

  it('disables typechecking when called with false', async () => {
    await bud.api.call('typecheck', false)
    expect(
      bud.extensions.has('fork-ts-checker-webpack-plugin'),
    ).toBeFalsy()
  })

  it('enables typechecking when called with no options', async () => {
    await bud.api.call('typecheck')

    expect(
      bud.extensions.has('fork-ts-checker-webpack-plugin'),
    ).toBeTruthy()
  })

  it('has typecheck method that accepts options object', async () => {
    const options = {
      async: false,
      typescript: {
        useTypescriptIncrementalApi: true,
        typescriptPath: require.resolve('typescript'),
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }
    await bud.api.call('typecheck', options)
    expect(
      bud.extensions.get('fork-ts-checker-webpack-plugin').options.all(),
    ).toEqual(options)
  })

  it('has typecheck method that accepts fn callback', async () => {
    await bud.api.call('typecheck', options => {
      options.set('async', true)
      return options
    })

    expect(
      bud.extensions
        .get('fork-ts-checker-webpack-plugin')
        .options.get('async'),
    ).toBe(true)
  })

  it('sets up ts module rule', async () => {
    expect(bud.build.rules['ts']).toBeDefined()
  })

  it('adds ts and tsx extensions', async () => {
    expect(bud.hooks.filter('build.resolve.extensions')).toContain('.ts')
    expect(bud.hooks.filter('build.resolve.extensions')).toContain('.tsx')
  })
})
