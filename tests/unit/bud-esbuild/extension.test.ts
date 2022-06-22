import {factory} from '@repo/test-kit/bud'
import {Bud} from '@roots/bud'
import {Loader} from '@roots/bud-build'
import esbuild from '@roots/bud-esbuild'

describe('@roots/bud-esbuild', () => {
  let bud: Bud
  let extension: any

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(esbuild)
    extension = bud.extensions.get('@roots/bud-esbuild')
    await bud.build.make()
  })

  it('has name prop', () => {
    expect(bud.extensions.get('@roots/bud-esbuild').label).toBe(
      '@roots/bud-esbuild',
    )
  })

  describe('module boot', () => {
    it('has label prop', () => {
      expect(extension.label).toBe('@roots/bud-esbuild')
    })

    it('is a method', () => {
      expect(extension.boot).toBeInstanceOf(Function)
    })

    it('registers js ruleset item', () => {
      expect(bud.build.rules.js.getUse()).toEqual([
        expect.stringContaining('esbuild-js'),
      ])
    })

    it('registers js ruleset item options', () => {
      expect(bud.build.items['esbuild-js'].getOptions()).toEqual(
        extension.getOption('js'),
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
        extension.options.ts,
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
    it('is a method', () => {
      expect(extension.options).toBeDefined()
    })

    it('yields expected options', async () => {
      expect(extension.options).toEqual({
        minify: {
          css: true,
          include: [
            expect.any(RegExp),
            expect.any(RegExp),
            expect.any(RegExp),
          ],
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
    it('single minifier', () => {
      expect(bud.build.config.optimization.minimizer).toHaveLength(1)
    })

    it.skip('registers loader', () => {
      expect(
        (bud.build.config.module.rules[1] as any).oneOf[0].use[0].loader,
      ).toEqual(expect.stringContaining('esbuild-loader'))
    })
  })
})
