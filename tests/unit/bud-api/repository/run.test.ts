import {run} from '@roots/bud-api/src/api/methods/run'

import {Bud, factory} from '../../../util/bud'

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
