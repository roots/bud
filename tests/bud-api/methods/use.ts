import {Framework, setupBud, teardownBud} from '../../util'
import babel from '@roots/bud-babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'

describe('bud.use', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud('production')
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  beforeEach(() => {
    bud.extensions.setStore({})
    /**
     * @todo fix the source of this bodge being necessary
     */
    bud.use({
      name: 'css-minimizer-webpack-plugin',
      options: {},
    })
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

    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers a webpack plugin', () => {
    bud.use(new HtmlWebpackPlugin())

    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers an inline webpack plugin', () => {
    bud.use({
      apply() {
        return null
      },
    })

    expect(bud.extensions.getEntries().length).toEqual(2)
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

  it('adds an apply plugin to the config', () => {
    const plugin = {
      name: 'my-plugin',
      apply(compiler) {
        // noop
      },
    }
    bud.use(plugin)
    expect(bud.build.config.plugins).toContain(plugin)
  })
})
