import dev from '@roots/bud/src/cli/commands/build/dev'

describe('Build Command', () => {
  it('has name: build', () => {
    expect(dev.name).toBe('Dev')
  })

  it('has description', () => {
    expect(dev.description).toBeDefined()
  })

  it(`description is 'Compile dev assets' `, () => {
    expect(dev.description).toBe('Compile dev assets')
  })

  it('has examples array', () => {
    expect(dev.examples).toBeInstanceOf(Array)
  })

  it(`has expected example`, () => {
    expect(dev.examples.pop()).toBe(`$ bud build:dev [name]`)
  })

  it(`has aliases`, () => {
    expect(dev.aliases).toBeInstanceOf(Array)
  })

  it('has expected aliases', () => {
    expect(dev.aliases).toEqual([
      'dev',
      'start',
      'build:development',
    ])
  })
})
