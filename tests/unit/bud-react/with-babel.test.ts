import '@roots/bud-babel'
import '@roots/bud-react'
import '@roots/bud-typescript'

import {Bud, factory} from '@repo/test-kit/bud'
import BudReact from '@roots/bud-react'
import BudTypeScript from '@roots/bud-typescript'

describe(`@roots/bud-react`, () => {
  let bud: Bud

  describe(`with babel`, () => {
    it(`uses babel transformer by default`, async () => {
      bud = await factory({mode: `development`})
      await bud.extensions.add([BudReact])

      await bud.extensions.runAll(`_afterConfig`)
      await bud.build.make()

      expect(bud.extensions.has(`@roots/bud-react/babel-refresh`)).toBe(
        true,
      )
    })

    it(`uses babel transformer if @roots/bud-typescript uses babel`, async () => {
      bud = await factory({mode: `development`})
      await bud.extensions.add([BudTypeScript, BudReact])

      await bud.extensions.runAll(`_afterConfig`)
      await bud.build.make()

      expect(bud.extensions.has(`@roots/bud-react/babel-refresh`)).toBe(
        true,
      )
    })

    it(`injects entrypoints`, async () => {
      bud = await factory({mode: `development`})
      await bud.extensions.add([BudReact])

      await bud.extensions.runAll(`_afterConfig`)
      await bud.build.make()

      // @ts-ignore
      expect(bud.build.config.entry.app.import).toContain(
        `react-refresh/runtime`,
      )
    })

    it(`adds babel plugin`, async () => {
      bud = await factory({mode: `development`})
      await bud.extensions.add([BudReact])

      await bud.extensions.runAll(`_afterConfig`)
      await bud.build.make()

      expect(bud.babel.plugins[`react-refresh/babel`].shift()).toEqual(
        expect.stringContaining(`react-refresh/babel.js`),
      )
    })
  })
})
