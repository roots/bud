import {Bud, factory} from '@repo/test-kit/bud'
import {Loader} from '@roots/bud-build'
import * as esbuild from '@roots/bud-esbuild'

describe('@roots/bud-esbuild', () => {
  let bud: Bud

  it('has name prop', () => {
    expect(esbuild.label).toBe('@roots/bud-esbuild')
  })

  describe('module boot', () => {
    beforeAll(async () => {
      bud = await factory()
      await bud.extensions.add(esbuild)
    })

    it('is a method', () => {
      expect(esbuild.boot).toBeInstanceOf(Function)
    })

    it('registers js ruleset item', () => {
      expect(bud.build.rules.js.getUse()).toEqual([
        expect.stringContaining('esbuild-js'),
      ])
    })

    it('registers js ruleset item options', () => {
      expect(bud.build.items['esbuild-js'].getOptions()).toEqual(
        bud.extensions.get('@roots/bud-esbuild').options.get('js'),
      )
    })

    it('resolves the esbuild loader', () => {
      expect(bud.build.items['esbuild-js'].getLoader()).toBeInstanceOf(
        Loader,
      )
    })

    it('registers ts ruleset item', () => {
      expect(bud.build.rules.ts.getUse()).toEqual([
        expect.stringContaining('esbuild-ts'),
      ])
    })

    it('registers ts ruleset item options', () => {
      expect(bud.build.items['esbuild-ts'].getOptions()).toEqual(
        bud.extensions.get('@roots/bud-esbuild').options.get('ts'),
      )
    })

    it('resolves the esbuild loader', () => {
      expect(bud.build.items['esbuild-ts'].getLoader()).toBeInstanceOf(
        Loader,
      )
    })

    it('registers esbuild loader', () => {
      expect(bud.build.loaders.esbuild).toBeInstanceOf(Loader)
    })
  })

  describe('module options', () => {
    beforeAll(async () => {
      bud = await factory()
    })

    it('is a method', () => {
      expect(esbuild.options).toBeInstanceOf(Function)
    })

    it('yields expected options', async () => {
      const options = esbuild.options(bud)

      expect(options).toEqual({
        minify: {
          css: true,
          include: [expect.any(RegExp), expect.any(RegExp)],
          exclude: expect.any(RegExp),
        },
        js: {
          loader: 'jsx',
          target: 'es2015',
        },
        ts: {
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: expect.any(Object),
        },
      })
    })
  })

  describe('does its job', () => {
    beforeAll(async () => {
      bud = await factory()
      await bud.extensions.add(esbuild)
      await bud.build.make()
    })

    it('only leaves a single minifier', () => {
      expect(bud.build.config.optimization.minimizer).toHaveLength(1)
    })

    it('registers loader', () => {
      expect(
        (bud.build.config.module.rules[1] as any).oneOf[0].use[0].loader,
      ).toEqual(expect.stringContaining('esbuild-loader'))
    })
  })
})
