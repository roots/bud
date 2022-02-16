import * as postcss from '@roots/bud-postcss'
import * as extension from '@roots/bud-purgecss'
import {purgecss} from '@roots/bud-purgecss/src/bud.purge'

import {Bud, factory} from '@repo/test-kit/bud'

describe('@roots/bud-purgecss', () => {
  test.todo('test @roots/bud-purgecss')

  describe('purgecss extension', () => {
    it('has name prop', () => {
      expect(extension.name).toBe('@roots/bud-purgecss')
    })
    it('has api prop', () => {
      expect(extension.api.purgecss).toBeInstanceOf(Function)
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
      await bud.extensions.processQueue()
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
      await bud.extensions.processQueue()
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
