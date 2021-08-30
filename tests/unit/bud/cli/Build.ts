import BuildCommand from '@roots/bud/lib/cjs/cli/Build'

describe('Build Command', () => {
  let result: Array<any>

  beforeEach(() => {
    result = []

    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => result.push(val) as any)
  })

  afterEach(() => jest.restoreAllMocks())

  it('has expected flags', () => {
    expect(BuildCommand.flags).toMatchSnapshot({
      cache: {
        allowNo: false,
        char: 'c',
        description: 'cache compiler references to disk',
        parse: expect.any(Function),
        type: 'boolean',
      },
      ci: {
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

  it('has expected description', () => {
    expect(BuildCommand.description).toMatchSnapshot(
      'Build application',
    )
  })

  it('has run function', () => {
    expect(BuildCommand.run).toBeInstanceOf(Function)
  })
})
