import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import BudPresetWordPress from './index.js'

describe(`@roots/bud-preset-wordpress`, () => {
  it(`should have label`, async () => {
    const bud = await factory({mode: `development`})
    const extension = new BudPresetWordPress(bud)
    expect(extension.label).toBe(`@roots/bud-preset-wordpress`)
  })
})
