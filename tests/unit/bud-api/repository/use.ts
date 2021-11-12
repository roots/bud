import {factory, Framework} from '@roots/bud'
import Babel from '@roots/bud-babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'

describe.skip('bud.use', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(async () => {
    bud.extensions.setStore({})

    await bud.use({
      name: 'css-minimizer-webpack-plugin',
      options: {},
    })
  })

  it('is a function', () => {
    expect(bud.use).toBeInstanceOf(Function)
  })

  it('registers an imported extension', async () => {
    await bud.use(Babel)

    bud.build.make()

    expect(bud.extensions.has('@roots/bud-babel'))
  })

  it('registers an inline extension', async () => {
    await bud.use({
      name: 'inline-extension',
    })

    bud.build.make()

    expect(bud.extensions.has('inline-extension'))
  })

  it('registers an anonymous extension', async () => {
    await bud.use({options: {}})

    bud.build.make()
    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers a webpack plugin', async () => {
    await bud.use(new HtmlWebpackPlugin())

    bud.build.make()
    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers an inline webpack plugin', async () => {
    await bud.use({
      apply() {
        return null
      },
    })

    bud.build.make()
    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers an imported webpack plugin', async () => {
    await bud.use(new HtmlWebpackPlugin())

    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers multiple extensions', async () => {
    await bud.use([Babel, new HtmlWebpackPlugin()])

    expect(bud.extensions.has('@roots/bud-babel')).toBe(true)
    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('adds an apply plugin to the config', async () => {
    const plugin = {
      name: 'my-plugin',
      apply(compiler) {
        // noop
      },
    }
    await bud.use(plugin)
    expect(bud.extensions.has('my-plugin')).toBe(true)
  })
})
