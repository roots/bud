import {config, factory, Framework} from '@roots/bud'
import {readJsonSync} from 'fs-extra'

describe('bud.discovery', function () {
  let bud: Framework
  let json = readJsonSync(process.cwd().concat('/package.json'))

  beforeAll(() => {
    bud = factory({
      config: {...config, ci: true},
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('contains a repository', () => {
    expect(bud.discovery.repository).toMatchSnapshot({
      description: expect.any(String),
      devDependencies: expect.any(Object),
      engines: expect.any(Object),
      license: expect.any(String),
      manifest: expect.any(Object),
      name: expect.any(String),
      packageManager: expect.any(String),
      private: true,
      repository: expect.any(Object),
      resolutions: expect.any(Object),
      version: expect.any(String),
      volta: expect.any(Object),
      workspaces: expect.any(Object),
    })
  })

  it('contains project level devDependencies', () => {
    expect(bud.discovery.get('devDependencies')).toEqual(
      json.devDependencies,
    )
  })

  it('contains project level devDependencies', () => {
    expect(bud.discovery.get('dependencies')).toEqual(
      json.dependencies,
    )
  })

  it('has hasPeerDependency function', () => {
    expect(bud.discovery.hasPeerDependency).toBeInstanceOf(
      Function,
    )
  })

  it('has discover function', () => {
    expect(bud.discovery.discover).toBeInstanceOf(Function)
  })

  it('discover method gathers dep data', () => {
    bud.discovery.set(`devDependencies.@roots/bud-postcss`, `*`)

    bud.discovery.discover(`devDependencies`)

    expect(
      bud.discovery.get(`peers.@roots/bud-postcss`),
    ).toMatchSnapshot({
      dependencies: {
        dev: {
          postcss: expect.any(String),
          'postcss-import': expect.any(String),
          'postcss-preset-env': expect.any(String),
        },
      },
      dir: expect.stringContaining('@roots/bud-postcss'),
      manifestPath: expect.stringContaining(
        '@roots/bud-postcss/manifest.yml',
      ),
      type: 'extension',
      ver: expect.any(String),
    })
  })

  it('has setRequired function', () => {
    expect(bud.discovery.setRequired).toBeInstanceOf(Function)
  })

  it('setRequired method collates required peers', () => {
    bud.discovery.setRequired()

    expect(bud.discovery.get('required')).toMatchSnapshot({
      postcss: {
        name: 'postcss',
        source: '@roots/bud-postcss',
        ver: expect.any(String),
        type: 'devDependencies',
      },
      'postcss-import': {
        name: 'postcss-import',
        source: '@roots/bud-postcss',
        ver: expect.any(String),
        type: 'devDependencies',
      },
      'postcss-preset-env': {
        name: 'postcss-preset-env',
        source: '@roots/bud-postcss',
        ver: expect.any(String),
        type: 'devDependencies',
      },
    })
  })

  it('has install function', () => {
    expect(bud.discovery.install).toBeInstanceOf(Function)
  })

  it('has registerDiscovered function', () => {
    expect(bud.discovery.registerDiscovered).toBeInstanceOf(
      Function,
    )
  })

  it('registerDiscovered method adds extensions', () => {
    bud.discovery.registerDiscovered()

    expect(bud.extensions.has('@roots/bud-postcss')).toBe(true)
  })

  it('has resolvePeers function', () => {
    expect(bud.discovery.resolvePeers).toBeInstanceOf(Function)
  })

  it('has resolveFrom property', () => {
    expect(bud.discovery.resolveFrom).toBeInstanceOf(Array)
  })

  it('resolveFrom contains paths of found peers', () => {
    expect(bud.discovery.resolveFrom).toMatchSnapshot([
      expect.stringContaining('@roots/bud-postcss'),
    ])
  })

  it('contains project level name', () => {
    expect(bud.discovery.get('name')).toEqual(json.name)
  })
})
