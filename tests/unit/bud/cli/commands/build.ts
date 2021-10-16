import build from '@roots/bud/src/cli/commands/build'

describe('Build Command', () => {
  it('has name: build', () => {
    expect(build.name).toBe('Build')
  })

  it('has description', () => {
    expect(build.description).toBeDefined()
  })

  it(`description is 'compile build assets' `, () => {
    expect(build.description).toBe('compile assets')
  })

  it('has examples array', () => {
    expect(build.examples).toBeInstanceOf(Array)
  })

  it('has expected flags', () => {
    expect(build.flags).toMatchSnapshot()
  })
})
