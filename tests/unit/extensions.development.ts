import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`development extensions`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: `development`}, true)
    expect(bud.mode).toBe(`development`)
  })

  it(`should match snapshot`, () => {
    expect(Object.keys(bud.extensions.repository).sort()).toMatchSnapshot()
  })
})
