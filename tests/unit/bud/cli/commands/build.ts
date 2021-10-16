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
    expect(build.flags).toMatchSnapshot({
      cache: {
        allowNo: false,
        char: 'c',
        description: 'cache compiler references to disk',
        parse: expect.any(Function),
        type: 'boolean',
      },
      cli: {
        allowNo: false,
        description: 'non raw mode tty interoperable output',
        parse: expect.any(Function),
        type: 'boolean',
      },
      discover: {
        allowNo: false,
        char: 'd',
        description:
          'automatically utilize installed extensions',
        parse: expect.any(Function),
        type: 'boolean',
      },
      hash: {
        allowNo: false,
        description: 'hash compiled filenames',
        parse: expect.any(Function),
        type: 'boolean',
      },
      help: {
        allowNo: false,
        char: 'h',
        description: 'show CLI help',
        parse: expect.any(Function),
        type: 'boolean',
      },
      install: {
        allowNo: false,
        char: 'i',
        description: 'ensure peer dependencies are installed',
        parse: expect.any(Function),
        type: 'boolean',
      },
      log: {
        allowNo: false,
        char: 'l',
        description: 'log to console',
        parse: expect.any(Function),
        type: 'boolean',
      },
      manifest: {
        allowNo: false,
        description: 'produce a manifest',
        parse: expect.any(Function),
        type: 'boolean',
      },
      minimize: {
        allowNo: false,
        char: 'm',
        description: 'minimize file size of compiled assets',
        parse: expect.any(Function),
        type: 'boolean',
      },
      target: {
        char: 't',
        default: [],
        description: 'limit compilation to this compiler',
        input: [],
        multiple: true,
        parse: expect.any(Function),
        type: 'option',
      },
    })
  })
})
