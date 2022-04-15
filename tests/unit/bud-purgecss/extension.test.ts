import {Bud, factory} from '@repo/test-kit/bud'
import * as postcss from '@roots/bud-postcss'
import * as extension from '@roots/bud-purgecss'
import {purgecss} from '@roots/bud-purgecss/src/bud.purge'

describe('@roots/bud-purgecss', () => {
  test.todo('test @roots/bud-purgecss')

  describe('purgecss extension', () => {
    it('has name prop', () => {
      expect(extension.label).toBe('@roots/bud-purgecss')
    })
    it('has a registration method', () => {
      expect(extension.register).toBeInstanceOf(Function)
    })
  })

  describe('register', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
      await bud.build.make()
      await bud.extensions.add(postcss)
    })

    it('has a registration method', () => {
      extension.register(bud)
      expect(bud.purgecss).toBeInstanceOf(Function)
    })
  })

  describe('bud.purgecss', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
      await bud.build.make()
      await bud.extensions.add(postcss)
    })

    it('is a fn', () => {
      expect(purgecss).toBeInstanceOf(Function)
    })

    it('adds the purgecss plugin to the postcss repository', () => {
      purgecss.bind(bud)({content: ['**/*.html']})

      expect(
        bud.postcss.get('@fullhuman/postcss-purgecss'),
      ).toBeInstanceOf(Array)

      const plugin = bud.postcss.get(
        '@fullhuman/postcss-purgecss[0]',
      )
      expect(plugin.OnceExit).toBeInstanceOf(Function)
      expect(plugin.postcssPlugin).toBe('postcss-purgecss')
    })
  })
})
