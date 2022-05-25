import {Bud, factory} from '@repo/test-kit/bud'
import BudPostCss from '@roots/bud-postcss'
import {resolve} from 'path'

describe('@roots/bud-postcss', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(BudPostCss)
  })

  it('label', () => {
    expect(bud.postcss.label).toBe('@roots/bud-postcss')
  })

  it('getPlugins', () => {
    expect(bud.postcss.getPlugins()).toBe(bud.postcss.plugins)
  })

  it('setPlugins from obj', () => {
    bud.postcss.setPlugins({foo: ['bar']})

    expect(bud.postcss.getPlugins()).toStrictEqual(
      new Map([['foo', ['bar']]]),
    )
  })

  it('setPlugins from map', () => {
    bud.postcss.setPlugins(new Map([['bang', ['bop']]]))

    expect(bud.postcss.getPlugins()).toStrictEqual(
      new Map([['bang', ['bop']]]),
    )
  })

  it('getPluginOptions', () => {
    bud.postcss.setPlugins(new Map([['bang', ['bop']]]))

    const options = bud.postcss.getPluginOptions('bang')
    expect(options).toStrictEqual({})
  })

  it('setPluginOptions', () => {
    bud.postcss.setPlugins(new Map([['bang', ['bop']]]))

    bud.postcss.setPluginOptions('bang', {})
    expect(bud.postcss.plugins.get('bang').pop()).toStrictEqual({})
  })

  it('setPluginOptions (callback)', () => {
    bud.postcss.setPlugins(new Map([['bang', ['bop']]]))

    bud.postcss.setPluginOptions('bang', {foo: 'bar'})

    bud.postcss.setPluginOptions('bang', options => {
      expect(options).toStrictEqual({foo: 'bar'})
      return options
    })
  })

  it('getPluginPath', () => {
    bud.postcss.setPlugins(new Map([['bang', ['setPluginPath test']]]))

    expect(bud.postcss.getPluginPath('bang')).toStrictEqual(
      'setPluginPath test',
    )
  })

  it('setPluginPath', () => {
    bud.postcss.setPlugins(new Map([['bang', ['bop']]]))

    bud.postcss.setPluginPath('bang', 'newPath')

    expect(bud.postcss.plugins.get('bang').shift()).toStrictEqual(
      'newPath',
    )
  })

  it('unsetPlugin', () => {
    bud.postcss.setPlugins(
      new Map([
        ['bang', ['bop']],
        ['bong', ['gong']],
      ]),
    )
  })

  it('unsetPlugin return bud.postcss', () => {
    const returnValue = bud.postcss.setPlugins(
      new Map([
        ['bang', ['bop']],
        ['bong', ['gong']],
      ]),
    )

    expect(returnValue).toBeInstanceOf(BudPostCss)
  })

  it('setPlugins return bud.postcss', () => {
    const returnValue = bud.postcss.setPlugins(
      new Map([
        ['bang', ['bop']],
        ['bong', ['gong']],
      ]),
    )

    expect(returnValue).toBeInstanceOf(BudPostCss)
  })

  it('setPlugin', () => {
    bud.postcss.setPlugins({})
    bud.postcss.setPlugin('postcss-preset-env')
    expect(bud.postcss.plugins.get('postcss-preset-env')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('postcss-preset-env'),
      ]),
    )
  })

  it('setPlugin (arr)', () => {
    bud.postcss.setPlugins({})
    bud.postcss.setPlugin(
      'postcss-preset-env',
      require.resolve('postcss-preset-env'),
    )

    expect(bud.postcss.plugins.get('postcss-preset-env')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('postcss-preset-env/'),
      ]),
    )
  })

  it('setPlugin (arr w/options)', () => {
    bud.postcss.setPlugins({})
    bud.postcss.setPlugin('postcss-preset-env', [
      require.resolve('postcss-preset-env'),
      {option: 'value'},
    ])

    expect(bud.postcss.plugins.get('postcss-preset-env')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('postcss-preset-env/'),
        expect.objectContaining({option: 'value'}),
      ]),
    )
  })

  it("throws when plugin doesn't exist", () => {
    bud.postcss.setPlugins({})

    try {
      expect(bud.postcss.getPluginOptions('no-exist')).toThrow()
    } catch (err) {}
  })

  it('registers loader', () => {
    expect(bud.build.loaders.postcss.getSrc()).toContain(
      'postcss-loader/dist/cjs.js',
    )
  })

  it('registers item', () => {
    expect(bud.build.items.postcss.getLoader().getSrc()).toContain(
      'postcss-loader/dist/cjs.js',
    )
  })

  it('added to css rule', () => {
    expect(bud.build.rules.css.getUse()).toContain('postcss')
  })
})
