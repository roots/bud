import {Bud, factory} from '@repo/test-kit/bud'
import {Loader} from '@roots/bud-build'
import esbuild from '@roots/bud-esbuild'

describe('@roots/bud-esbuild', () => {
  let bud: Bud
  let controller: any

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(esbuild)
    controller = bud.extensions.get('@roots/bud-esbuild')
    await bud.build.make()
  })

  it('has name prop', () => {
    expect(bud.extensions.get('@roots/bud-esbuild').get('label')).toBe(
      '@roots/bud-esbuild',
    )
  })

  describe('module boot', () => {
    it('has label prop', () => {
      expect(controller.get('label')).toBe('@roots/bud-esbuild')
    })

    it('is a method', () => {
      expect(controller.module.boot).toBeInstanceOf(Function)
    })

    it('registers js ruleset item', () => {
      expect(bud.build.rules.js.getUse()).toEqual([
        expect.stringContaining('esbuild-js'),
      ])
    })

    it('registers js ruleset item options', () => {
      expect(bud.build.items['esbuild-js'].getOptions()).toEqual(
        controller.getOption('js'),
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
        controller.module.options.ts,
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
      expect(controller.module.options).toBeDefined()
    })

    it('yields expected options', async () => {
      const options = controller.module.options

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
    it('single minifier', () => {
      expect(bud.build.config.optimization.minimizer).toHaveLength(1)
    })

    it('registers loader', () => {
      expect(
        (bud.build.config.module.rules[1] as any).oneOf[0].use[0].loader,
      ).toEqual(expect.stringContaining('esbuild-loader'))
    })
  })
})
