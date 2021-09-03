import clean from '@roots/bud/src/cli/commands/clean/dist'

describe('$ bud clean:dist', () => {
  it('has description', () => {
    expect(clean.description).toBeDefined()
  })

  it(`description is 'Clean dist' `, () => {
    expect(clean.description).toBe('Clean dist directory')
  })

  it('has examples array', () => {
    expect(clean.examples).toBeInstanceOf(Array)
  })

  it(`has expected example`, () => {
    expect(clean.examples.pop()).toBe(`$ bud clean:dist`)
  })

  it('has expected target', () => {
    expect(clean.target.pop()).toEqual('dist')
  })
})
