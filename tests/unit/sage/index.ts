import '@roots/bud-api'

import {config, factory, Framework} from '@roots/bud'
import * as Sage from '@roots/sage'

describe('@roots/sage', () => {
  let SAGE_DIR = process.cwd().concat('/examples/sage')

  let SAGE_CFG = {
    config: {
      ...config,
      cache: false,
      location: {
        ...config.location,
        project: SAGE_DIR,
      },
    },
  }

  let bud: Framework = null
  let bootSpy = jest.spyOn(Sage, 'boot')

  beforeAll(() => {
    bud = factory(SAGE_CFG)
    bud.use(Sage)
    bud.cache.updateProfile()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('extension has name prop', () => {
    expect(Sage.name).toBe('@roots/sage')
  })

  it('extension boot method was called', () => {
    expect(bootSpy).toHaveBeenCalled()
  })

  it(`sage required peers matches snapshot`, () => {
    expect(bud.project.get('peers')).toMatchSnapshot({
      '@wordpress/browserslist-config': {
        name: '@wordpress/browserslist-config',
        version: '4.1.0',
      },
      postcss: {name: 'postcss', version: '8.3.11'},
      'postcss-import': {
        name: 'postcss-import',
        version: '14.0.2',
      },
      'postcss-preset-env': {
        name: 'postcss-preset-env',
        version: '6.7.0',
      },
      react: {name: 'react', version: '17.0.2'},
      'react-dom': {name: 'react-dom', version: '17.0.2'},
      eslint: {name: 'eslint', version: '7.32.0'},
      prettier: {name: 'prettier', version: '2.4.1'},
      tailwindcss: {name: 'tailwindcss', version: '^2.2.8'},
    })
  })

  it('sage resolveFrom matches snapshot', () => {
    const config = bud.build.make()

    expect(config.resolve.modules).toMatchSnapshot([
      expect.stringContaining('resources'),
      expect.stringContaining('node_modules'),
      expect.stringContaining('@roots/sage'),
      expect.stringContaining('@roots/bud-preset-wordpress'),
      expect.stringContaining('@roots/bud-preset-recommend'),
      expect.stringContaining('@roots/bud-babel'),
      expect.stringContaining('@roots/bud-entrypoints'),
      expect.stringContaining('@roots/bud-postcss'),
      expect.stringContaining('@roots/bud-react'),
      expect.stringContaining('@roots/bud-wordpress-externals'),
      expect.stringContaining(
        '@roots/bud-wordpress-dependencies',
      ),
      expect.stringContaining('@roots/bud-wordpress-manifests'),
      expect.stringContaining('@roots/bud-eslint'),
      expect.stringContaining('@roots/bud-prettier'),
      expect.stringContaining('@roots/bud-stylelint'),
      expect.stringContaining('@roots/bud-tailwindcss'),
    ])
  })

  it('has expected paths', () => {
    expect(bud.publicPath()).toEqual('')
    expect(bud.path('src')).toEqual(
      SAGE_DIR.concat('/resources'),
    )
  })

  it('babel is used', () => {
    expect(bud.extensions.has('@roots/bud-babel')).toEqual(true)
  })

  it('postcss is used', () => {
    expect(bud.extensions.has('@roots/bud-postcss')).toEqual(
      true,
    )
  })

  it('react is used', () => {
    expect(bud.extensions.has('@roots/bud-react')).toEqual(true)
  })

  it('tailwindcss is used', () => {
    expect(bud.extensions.has('@roots/bud-tailwindcss')).toEqual(
      true,
    )
  })
})
