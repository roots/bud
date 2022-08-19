import {factory} from '@repo/test-kit/bud'

describe(`test environment sanity checks`, () => {
  it(`should run a test without errors`, () => {
    expect(true).toBe(true)
  })

  it(`should run an async test without errors`, async () => {
    await new Promise(resolve =>
      setTimeout(() => resolve(expect(true).toBe(true)), 10),
    )
  })

  it(`should have JEST_WORKER_ID defined`, () => {
    expect(process.env.JEST_WORKER_ID).toBeDefined()
  })

  it(`bud mock should be banning @roots/bud-swc`, async () => {
    const bud = await factory({mode: `production`})
    expect(bud.extensions.repository).not.toHaveProperty(`@roots/bud-swc`)
  })
})
