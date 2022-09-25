import '@roots/bud-postcss'

import {describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'
import BudTailwindCssExtension from '@roots/bud-tailwindcss'

describe(`@roots/bud-tailwindcss`, () => {
  let bud: Bud
  let instance: BudTailwindCssExtension

  beforeAll(async () => {
    bud = await factory({}, false)
    instance = new BudTailwindCssExtension(bud)
  })

  it(`has name prop`, () => {
    expect(instance.label).toBe(`@roots/bud-tailwindcss`)
  })

  it(`queues up postcss`, async () => {
    bud = await factory({}, false)
    await bud.extensions.add(BudTailwindCssExtension)
    expect(bud.extensions.has(`@roots/bud-postcss`))
  })

  it(`sets up postcss plugins`, async () => {
    bud = await factory({}, false)

    await bud.extensions.add(BudTailwindCssExtension)
    const plugins = [...bud.postcss.plugins.keys()]

    expect(plugins).toContain(`tailwindcss`)
  })
})
