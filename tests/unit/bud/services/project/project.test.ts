import {fs} from '@roots/bud-support'
import {Bud, factory} from '@repo/test-kit/bud'
import {expect, describe, beforeAll, it} from '@jest/globals'

const PROJECT_MANIFEST_PATH = `${process.cwd()}/tests/util/project/package.json`
const PROJECT_BUD_PROFILE_PATH = `${process.cwd()}/tests/util/project/.budfiles/bud/profile.json`

describe('bud.project', function () {
  let bud: Bud
  let manifest: Record<string, any>
  let profile: Record<string, any>

  beforeAll(async () => {
    bud = await factory()
    await bud.build.make()
    manifest = await fs.readJson(PROJECT_MANIFEST_PATH)
    profile = await fs.readJson(PROJECT_BUD_PROFILE_PATH)
  })

  it('holds cache validation hash', () => {
    expect(bud.project.get('cache')).toMatchSnapshot({
      hash: expect.any(String),
    })
  })

  it('holds cache deps', async () => {
    expect(bud.project.get('dependencies').length).toEqual(2)
  })

  it('holds env values', async () => {
    expect(bud.project.get('env.all')).toMatchSnapshot({
      TEST: 'VALUE',
      PUBLIC_APP_TEST: 'PUBLIC_VALUE',
    })

    expect(bud.project.get('env.public')).toMatchSnapshot({
      APP_TEST: 'PUBLIC_VALUE',
    })
  })

  it('has evn records matching profile.json artifact', async () => {
    expect(bud.project.get('env.all')).toMatchSnapshot(
      profile.env.all,
    )
    expect(bud.project.get('env.public')).toMatchSnapshot(
      profile.env.public,
    )
  })

  it('holds cli records', async () => {
    expect(bud.project.get('cli')).toStrictEqual({
      args: {},
      argv: [],
      flags: {},
      metadata: {},
      raw: [],
    })
  })

  it('holds manifest records', async () => {
    expect(bud.project.get('manifest')).toStrictEqual(manifest)
  })

  it('references @roots/bud-babel', async () => {
    expect(
      bud.project.get('modules.@roots/bud-babel'),
    ).toMatchSnapshot({
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
    expect(
      bud.project.get('modules.@roots/bud-eslint'),
    ).toMatchSnapshot({
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
    expect(
      bud.project.get('modules.@roots/bud-postcss'),
    ).toMatchSnapshot({
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
      parent: null,
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
      expect.stringContaining('/sources'),
    ])
  })
})
