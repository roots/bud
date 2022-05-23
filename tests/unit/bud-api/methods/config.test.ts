import {Bud, factory} from '@repo/test-kit/bud'
import {config} from '@roots/bud-api/methods/config'

describe('bud.config', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(config).toBeInstanceOf(Function)
  })

  it('returns bud', () => {
    expect(config.call(bud, {})).toBeInstanceOf(Bud)
  })

  it('throws with no input', () => {
    expect(() => config.call(bud)).toThrow()
  })

  it('obj conf', async () => {
    config.call(bud, {
      entry: 'foo',
    })

    const result = await bud.build.make()

    expect(result.entry).toBe('foo')
  })

  it('fn conf', async () => {
    config.call(bud, conf => ({
      ...conf,
      entry: undefined,
    }))

    const result = await bud.build.make()

    expect(result.entry).toBeUndefined()
  })
})
