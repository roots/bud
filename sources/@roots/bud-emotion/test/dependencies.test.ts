import {resolve} from '@roots/bud-support/import-meta-resolve'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-emotion dependencies`, () => {
  it(`should resolve dependencies from hoisted modules`, async () => {
    expect(
      await resolve(`@emotion/babel-plugin`, import.meta.url),
    ).toMatch(/\/bud\/node_modules\/@emotion\/babel-plugin/)
    expect(
      await resolve(`@swc/plugin-emotion`, import.meta.url),
    ).toMatch(/\/bud\/node_modules\/@swc\/plugin-emotion/)
    expect(
      await resolve(`@emotion/styled`, import.meta.url),
    ).toMatch(/\/bud\/node_modules\/@emotion\/styled/)
    expect(
      await resolve(`@emotion/react`, import.meta.url),
    ).toMatch(/\/bud\/node_modules\/@emotion\/react/)
    expect(
      await resolve(`@emotion/css`, import.meta.url),
    ).toMatch(/\/bud\/node_modules\/@emotion\/css/)
  })
})
