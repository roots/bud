import {repoPath} from '@repo/test-kit/bud'

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

  it(`should skip cache`, async () => {
    const pkg = await import(`@roots/bud/context`)
    await pkg.get(repoPath(`tests/util/project`))

    expect(pkg.skippedCache).toBe(true)
  })

  it(`should skip cache`, async () => {
    const pkg = await import(`@roots/bud/context`)
    const context = await pkg.get(repoPath(`tests/util/project`))

    expect(context.label).toBe(`@tests/project`)
  })
})
