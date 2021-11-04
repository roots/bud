import {factory, Framework} from '@roots/bud'
import Babel from '@roots/bud-babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'

describe.skip('bud.use', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  afterAll(done => {
    bud.close(done)
  })

  beforeEach(() => {
    bud.extensions.setStore({})
    bud.use({
      name: 'css-minimizer-webpack-plugin',
      options: {},
    })
  })

  it('is a function', () => {
    expect(bud.use).toBeInstanceOf(Function)
  })

  it('registers an imported extension', () => {
    bud.use(Babel).build.make()

    expect(bud.extensions.has('@roots/bud-babel'))
  })

  it('registers an inline extension', () => {
    bud
      .use({
        name: 'inline-extension',
      })
      .build.make()

    expect(bud.extensions.has('inline-extension'))
  })

  it('registers an anonymous extension', () => {
    bud.use({options: {}}).build.make()
    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers a webpack plugin', () => {
    bud.use(new HtmlWebpackPlugin()).build.make()
    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers an inline webpack plugin', () => {
    bud
      .use({
        apply() {
          return null
        },
      })
      .build.make()

    expect(bud.extensions.getEntries().length).toEqual(2)
  })

  it('registers an imported webpack plugin', () => {
    bud.use(new HtmlWebpackPlugin())

    expect(bud.extensions.has('HtmlWebpackPlugin')).toBe(true)
  })

  it('registers multiple extensions', () => {
    bud.use([Babel, new HtmlWebpackPlugin()])

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
    expect(bud.extensions.has('my-plugin')).toBe(true)
  })
})
