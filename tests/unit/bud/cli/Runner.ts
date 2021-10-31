/* eslint-disable no-console */
import {Runner} from '@roots/bud/src/cli/Runner'

describe('Runner', () => {
  let runner: Runner

  beforeEach(async () => {
    runner = new Runner(
      {args: [], argv: [], flags: {}, raw: [], metadata: {}},
      {},
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('make', () => {
    expect(runner.make).toBeInstanceOf(Function)
  })
})
