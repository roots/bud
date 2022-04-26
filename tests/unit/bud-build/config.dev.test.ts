import {Bud, factory} from '@repo/test-kit/bud'

/* 3x */
jest.setTimeout(15000)

describe('[dev] bud.build.config', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
    await bud.build.make()
  })

  it('has expected bail default', () => {
    expect(bud.build.config.bail).toEqual(false)
  })

  it('has expected mode default', () => {
    expect(bud.build.config.mode).toEqual('development')
  })
})
