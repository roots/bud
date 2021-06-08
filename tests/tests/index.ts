// this might be weird, but it helps to detect memory leaks within the test environment itself
describe('test environment sanity checks', () => {
  it('should run a test without errors', () => {
    expect(true).toBe(true)
  })

  it('should run an async test without errors', async () => {
    await new Promise(resolve =>
      setTimeout(() => resolve(expect(true).toBe(true)), 10),
    )
  })
})

// TODO: test setup and teardown of bud?
