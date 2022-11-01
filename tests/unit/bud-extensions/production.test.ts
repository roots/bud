import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`Extensions`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({}, true)
    expect(bud.mode).toBe(`production`)
    await bud.run()
  })

  it(`[production] bud.extensions.repository matches snapshot`, () => {
    expect(Object.keys(bud.extensions.repository).sort()).toMatchSnapshot()
  })
})
