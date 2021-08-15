import {config, factory, Framework} from '@roots/bud'
import * as sage from '@roots/sage'

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

describe('@roots/sage', () => {
  let bud: Framework = null
  let bootSpy = jest.spyOn(sage, 'boot')

  beforeAll(() => {
    bud = factory(SAGE_CFG)
    bud.discovery.set('devDependencies.react', '*')
    bud.discovery.set('devDependencies.tailwindcss', '*')
    bud.discovery.set('devDependencies.postcss', '*')
    bud.discovery.set('devDependencies.babel', '*')

    bud.use(sage)
  })

  it('extension has name prop', () => {
    expect(sage.name).toBe('@roots/sage')
  })

  it('extension boot method was called', () => {
    expect(bootSpy).toHaveBeenCalled()
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
