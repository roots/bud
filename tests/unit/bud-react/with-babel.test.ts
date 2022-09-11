import '@roots/bud-babel'
import '@roots/bud-react'
import '@roots/bud-typescript'

import {factory} from '@repo/test-kit/bud'
import BudReact from '@roots/bud-react'
import BudTypeScript from '@roots/bud-typescript'

describe(`@roots/bud-react`, () => {
  describe(`with babel`, () => {
    it(`uses babel transformer by default`, async () => {
      const bud = await factory({mode: `development`})
      await bud.extensions.add([BudReact])

      await bud.extensions.runAll(`configAfter`)
      await bud.build.make()

      expect(bud.extensions.has(`@roots/bud-react/babel-refresh`)).toBe(
        true,
      )

      bud.close()
    })

    it(`uses babel transformer if @roots/bud-typescript uses babel`, async () => {
      const bud = await factory({mode: `development`})
      await bud.extensions.add([BudTypeScript, BudReact])

      await bud.extensions.runAll(`configAfter`)
      await bud.build.make()

      expect(bud.extensions.has(`@roots/bud-react/babel-refresh`)).toBe(
        true,
      )

      bud.close()
    })

    it(`injects entrypoints`, async () => {
      const bud = await factory(
        {
          mode: `development`,
          extensions: [`@roots/bud-react`],
        },
        true,
      )
      expect(bud.extensions.has(`@roots/bud-react`)).toBe(true)

      await bud.extensions.runAll(`configAfter`)

      // @ts-ignore
      const devScript = await Array.from(
        bud.hooks.filter(`dev.client.scripts`),
      )?.pop()(bud)

      expect(devScript).toEqual(`react-refresh/runtime`)
    })

    it(`adds babel plugin`, async () => {
      const bud = await factory(
        {
          mode: `development`,
          extensions: [`@roots/bud-react`],
        },
        true,
      )
      await bud.build.make()

      expect(bud.babel.plugins[`react-refresh/babel`].shift()).toEqual(
        expect.stringContaining(`react-refresh/babel.js`),
      )

      bud.close()
    })
  })
})
