describe('cli index', () => {
  it('exports @oclif/command run fn', async () => {
    const {run} = await import('@roots/bud/src/cli/index')
    const {run: oclifRun} = await import(
      '@roots/bud/src/cli/index'
    )

    expect(run).toBeDefined()
    expect(run).toEqual(oclifRun)
  })
})
