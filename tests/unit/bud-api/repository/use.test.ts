import {Bud, factory} from '@repo/test-kit/bud'
import * as Babel from '@roots/bud-babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'

describe('bud.use', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(async () => {
    bud.extensions.setStore({})

    bud.use({
      name: 'css-minimizer-webpack-plugin',
      options: {},
    })

    await bud.api.processQueue()
    await bud.extensions.processQueue()
  })

  it('is a function', () => {
    expect(bud.use).toBeInstanceOf(Function)
  })

  it('returns bud', () => {
    expect(bud.use({name: 'foo'})).toBeInstanceOf(Bud)
  })

  it('registers an imported extension', async () => {
    bud.use(Babel)
    await bud.api.processQueue()
    await bud.extensions.processQueue()
    expect(bud.extensions.has('@roots/bud-babel'))
  })

  it('registers an inline extension', async () => {
    bud.use({name: 'inline-extension'})
    await bud.api.processQueue()
    await bud.extensions.processQueue()
    expect(bud.extensions.has('inline-extension'))
  })

  it('registers an anonymous extension', async () => {
    bud.use({options: {}})
    await bud.api.processQueue()
    await bud.extensions.processQueue()
    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers a webpack plugin', async () => {
    bud.use(new HtmlWebpackPlugin())
    await bud.api.processQueue()
    await bud.extensions.processQueue()
    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers an inline webpack plugin', async () => {
    bud.use({apply() {}})
    await bud.api.processQueue()
    await bud.extensions.processQueue()
    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers an imported webpack plugin', async () => {
    bud.use(new HtmlWebpackPlugin())
    await bud.api.processQueue()
    await bud.extensions.processQueue()
    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers multiple extensions', async () => {
    bud.use([Babel, new HtmlWebpackPlugin()])
    await bud.api.processQueue()
    await bud.extensions.processQueue()
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
    bud.use(plugin)
    await bud.api.processQueue()
    await bud.extensions.processQueue()
    expect(bud.extensions.has('my-plugin')).toBe(true)
  })
})
