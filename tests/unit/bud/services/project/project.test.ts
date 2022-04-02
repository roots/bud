import {Bud, factory} from '@repo/test-kit/bud'

jest.setTimeout(15000)

describe('bud.project', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.build.make()
  })

  it('references @roots/bud-babel', async () => {
    expect(bud.project.get('modules.@roots/bud-babel')).toMatchSnapshot({
      bud: {type: 'extension'},
      name: '@roots/bud-babel',
      peerDependencies: {},
      requires: [],
      resolvable: true,
      version: expect.any(String),
    })
  })

  it('references @roots/bud-entrypoints', async () => {
    expect(
      bud.project.get('modules.@roots/bud-entrypoints'),
    ).toMatchSnapshot({
      bud: {
        type: 'extension',
      },
      name: '@roots/bud-entrypoints',
      peerDependencies: {},
      requires: [],
      resolvable: true,
      version: expect.any(String),
    })
  })

  it('references @roots/bud-eslint', async () => {
    expect(bud.project.get('modules.@roots/bud-eslint')).toMatchSnapshot({
      bud: {
        type: 'extension',
      },
      name: '@roots/bud-eslint',
      peerDependencies: {
        eslint: expect.any(String),
      },
      requires: [],
      resolvable: true,
      version: expect.any(String),
    })
  })

  it('references @roots/bud-postcss', async () => {
    expect(bud.project.get('modules.@roots/bud-postcss')).toMatchSnapshot({
      bud: {
        type: 'extension',
      },
      name: '@roots/bud-postcss',
      peerDependencies: {
        postcss: expect.any(String),
        'postcss-import': expect.any(String),
        'postcss-nested': expect.any(String),
        'postcss-preset-env': expect.any(String),
      },
      requires: [],
      resolvable: true,
      version: expect.any(String),
    })
  })

  it('references @roots/bud-entrypoints', async () => {
    expect(
      bud.project.get('modules.@roots/bud-entrypoints'),
    ).toMatchSnapshot({
      bud: {
        type: 'extension',
      },
      name: '@roots/bud-entrypoints',
      peerDependencies: {},
      requires: [],
      resolvable: true,
      version: expect.any(String),
    })
  })

  it('references @roots/bud-preset-recommend', async () => {
    expect(
      bud.project.get('modules.@roots/bud-preset-recommend'),
    ).toMatchSnapshot({
      bud: {
        peers: [
          '@roots/bud-babel',
          '@roots/bud-entrypoints',
          '@roots/bud-postcss',
        ],
        type: 'extension',
      },
      name: '@roots/bud-preset-recommend',
      peerDependencies: {},
      requires: [
        ['@roots/bud-babel', expect.any(String)],
        ['@roots/bud-entrypoints', expect.any(String)],
        ['@roots/bud-postcss', expect.any(String)],
      ],
      resolvable: true,
      version: expect.any(String),
    })
  })

  it('references the root package', async () => {
    expect(bud.project.get('modules.root')).toMatchSnapshot({
      browserslist: ['extends @wordpress/browserslist-config'],
      bud: null,
      devDependencies: {
        '@roots/bud': 'workspace:*',
        '@roots/bud-babel': 'workspace:*',
        '@roots/bud-eslint': 'workspace:*',
        '@roots/bud-postcss': 'workspace:*',
        '@roots/bud-preset-recommend': 'workspace:*',
        '@roots/bud-tailwindcss': 'workspace:*',
      },
      name: 'root',
      private: true,
      requires: [
        ['@roots/bud', 'workspace:*'],
        ['@roots/bud-babel', 'workspace:*'],
        ['@roots/bud-eslint', 'workspace:*'],
        ['@roots/bud-postcss', 'workspace:*'],
        ['@roots/bud-preset-recommend', 'workspace:*'],
        ['@roots/bud-tailwindcss', 'workspace:*'],
      ],
      resolvable: true,
      version: expect.any(String),
    })
  })

  it('references @roots/bud-tailwindcss', async () => {
    expect(
      bud.project.get('modules.@roots/bud-tailwindcss'),
    ).toMatchSnapshot({
      bud: {
        peers: ['@roots/bud-postcss'],
        type: 'extension',
      },
      name: '@roots/bud-tailwindcss',
      peerDependencies: {
        tailwindcss: expect.any(String),
      },
      requires: [['@roots/bud-postcss', expect.any(String)]],
      resolvable: true,
      version: expect.any(String),
    })
  })

  it('resolveFrom contains paths of found peers', async () => {
    expect(bud.build.config.resolve.modules).toMatchSnapshot([
      expect.stringContaining('src'),
      expect.stringContaining('node_modules'),
    ])
  })
})
