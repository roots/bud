import '@roots/bud-babel'
import '@roots/bud-react'
import '@roots/bud-typescript'

import {Bud, factory} from '@repo/test-kit/bud'
import BudReact from '@roots/bud-react'
import BudTypeScript from '@roots/bud-typescript'

describe(`@roots/bud-react`, () => {
  let bud: Bud

  describe(`with typescript`, () => {
    it(`uses typescript transformer when babel is disabled`, async () => {
      bud = await factory({mode: `development`})
      expect(bud.mode).toEqual(`development`)

      await bud.extensions.add([BudTypeScript, BudReact])

      bud.typescript.useBabel(false)
      await bud.extensions.runAll(`configAfter`)
      await bud.build.make()

      expect(
        bud.extensions.has(`@roots/bud-react/typescript-refresh`),
      ).toBe(true)
    })

    it(`injects entrypoints`, async () => {
      bud = await factory({mode: `development`})
      await bud.extensions.add([BudReact])

      await bud.extensions.runAll(`configAfter`)
      await bud.build.make()

      // @ts-ignore
      expect(bud.build.config.entry.app.import).toContain(
        `react-refresh/runtime`,
      )
    })
  })
})
