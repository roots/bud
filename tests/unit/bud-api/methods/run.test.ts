import {Bud, factory} from '@repo/test-kit/bud'
import {run} from '@roots/bud-api/methods/run'

describe('bud.run', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(JSON.stringify(run.bind(bud))).toEqual(
      JSON.stringify(bud.api.get('run')),
    )
  })
})
