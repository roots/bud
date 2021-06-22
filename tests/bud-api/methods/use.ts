import {Framework, setupBud, teardownBud, log} from '../../util'
import babel from '@roots/bud-babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'

describe('bud.use', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  beforeEach(() => {
    bud.extensions.setStore({})
  })

  it('is a function', () => {
    expect(bud.use).toBeInstanceOf(Function)
  })

  it('registers an imported extension', () => {
    bud.use(babel)

    expect(bud.extensions.has('@roots/bud-babel'))
  })

  it('registers an inline extension', () => {
    bud.use({
      name: 'inline-extension',
    })

    expect(bud.extensions.has('inline-extension'))
  })

  it('registers an anonymous extension', () => {
    bud.use({options: {}})

    expect(bud.extensions.getEntries().length).toEqual(1)
  })

  it('registers a webpack plugin', () => {
    bud.use(new HtmlWebpackPlugin())

    expect(bud.extensions.getEntries().length).toEqual(1)
  })

  it('registers an inline webpack plugin', () => {
    bud.use({
      apply() {
        return null
      },
    })

    expect(bud.extensions.getEntries().length).toEqual(1)
  })

  it('registers an imported webpack plugin', () => {
    bud.use(new HtmlWebpackPlugin())

    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers multiple extensions', () => {
    bud.use([babel, new HtmlWebpackPlugin()])

    expect(bud.extensions.has('@roots/bud-babel')).toBe(true)
    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })
})
