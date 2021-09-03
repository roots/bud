import production from '@roots/bud/src/cli/commands/build/production'

describe('$ bud build:production', () => {
  it('has name: build', () => {
    expect(production.name).toBe('Production')
  })

  it('has description', () => {
    expect(production.description).toBeDefined()
  })

  it(`description is 'Compile production assets' `, () => {
    expect(production.description).toBe(
      'Compile production assets',
    )
  })

  it('has examples array', () => {
    expect(production.examples).toBeInstanceOf(Array)
  })

  it(`has expected example`, () => {
    expect(production.examples.pop()).toBe(
      `$ bud build:production [name]`,
    )
  })

  it(`has aliases`, () => {
    expect(production.aliases).toBeInstanceOf(Array)
  })

  it('has expected aliases', () => {
    expect(production.aliases).toEqual([
      'build',
      'build:production',
      'production',
    ])
  })
})
