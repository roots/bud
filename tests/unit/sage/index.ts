import '@roots/bud-api'

import {config, factory, Framework} from '@roots/bud'
import * as Sage from '@roots/sage'

describe('@roots/sage', () => {
  let SAGE_DIR = process.cwd().concat('/examples/sage')

  let SAGE_CFG = {
    config: {
      ...config,

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
        type: 'devDependencies',
        ver: expect.any(String),
      },
      eslint: {
        name: 'eslint',
        type: 'devDependencies',
        ver: expect.any(String),
      },
      postcss: {
        name: 'postcss',
        type: 'devDependencies',
        ver: expect.any(String),
      },
      'postcss-import': {
        name: 'postcss-import',
        type: 'devDependencies',
        ver: expect.any(String),
      },
      'postcss-preset-env': {
        name: 'postcss-preset-env',
        type: 'devDependencies',
        ver: expect.any(String),
      },
      react: {
        name: 'react',
        type: 'devDependencies',
        ver: expect.any(String),
      },
      'react-dom': {
        name: 'react-dom',
        type: 'devDependencies',
        ver: expect.any(String),
      },
      tailwindcss: {
        name: 'tailwindcss',
        type: 'devDependencies',
        ver: expect.any(String),
      },
    })
  })

  it('sage resolveFrom matches snapshot', () => {
    expect(bud.project.resolveFrom).toMatchSnapshot([
      expect.stringContaining('@roots/bud'),
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
    expect(bud.path('storage')).toEqual(
      SAGE_DIR.concat('/storage/bud'),
    )
    expect(bud.publicPath()).toEqual('')
    expect(bud.path('dist')).toEqual(SAGE_DIR.concat('/public'))
    expect(bud.path('src')).toEqual(
      SAGE_DIR.concat('/resources'),
    )
  })

  it('has expected aliases', () => {
    bud.build.make()
    const {alias: aliases} = bud.build.config.resolve

    expect(aliases['@fonts']).toEqual(
      SAGE_DIR.concat('/resources/fonts'),
    )
    expect(aliases['@images']).toEqual(
      SAGE_DIR.concat('/resources/images'),
    )
    expect(aliases['@scripts']).toEqual(
      SAGE_DIR.concat('/resources/scripts'),
    )
    expect(aliases['@styles']).toEqual(
      SAGE_DIR.concat('/resources/styles'),
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
