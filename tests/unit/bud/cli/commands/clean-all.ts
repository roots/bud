import clean from '@roots/bud/src/cli/commands/clean/all'

describe('$ bud clean:all', () => {
  it('has name: build', () => {
    expect(clean.title).toBe('Clean All')
  })

  it('has description', () => {
    expect(clean.description).toBeDefined()
  })

  it(`description is 'Clean all' `, () => {
    expect(clean.description).toBe('Clean all')
  })

  it('has examples array', () => {
    expect(clean.examples).toBeInstanceOf(Array)
  })

  it(`has expected example`, () => {
    expect(clean.examples.pop()).toBe(`$ bud clean:all`)
  })

  it('has expected target', () => {
    expect(clean.target.pop()).toEqual('all')
  })
})
