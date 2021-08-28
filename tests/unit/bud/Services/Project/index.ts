import {factory, Framework} from '@roots/bud'
import {readJson} from 'fs-extra'

describe('bud.project', function () {
  let bud: Framework
  let json: {
    description: string
    dependencies: {[key: string]: any}
    devDependencies: {[key: string]: any}
    engines: {[key: string]: any}
    license: string
    manifest: {[key: string]: any}
    name: string
    packageManager: string
    private: boolean
    repository: {[key: string]: any}
    resolutions: {[key: string]: any}
    version: string
    volta: {[key: string]: any}
    workspaces: {[key: string]: any}
  }

  beforeAll(async () => {
    json = await readJson(process.cwd().concat('/package.json'))
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('contains a repository', () => {
    expect(bud.project.repository).toMatchSnapshot({
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
    expect(bud.project.get('devDependencies')).toEqual(
      json.devDependencies,
    )
  })

  it('contains project level devDependencies', () => {
    expect(bud.project.get('dependencies')).toEqual(
      json.dependencies,
    )
  })

  it('has hasPeerDependency function', () => {
    expect(bud.project.hasPeerDependency).toBeInstanceOf(
      Function,
    )
  })

  it('has discover function', () => {
    expect(bud.project.peers.discover).toBeInstanceOf(Function)
  })

  it('discover method gathers dep data', () => {
    bud.project.set(
      `devDependencies.@roots/bud-postcss`,
      `workspace:packages/@roots/bud-postcss`,
    )

    bud.project.peers.discover(`devDependencies`)

    expect(
      bud.project.get(`extensions.@roots/bud-postcss`),
    ).toMatchSnapshot()
  })

  it('collates required peers', () => {
    expect(bud.project.get('peers')).toMatchSnapshot({
      postcss: {
        name: 'postcss',
        ver: expect.any(String),
        type: 'devDependencies',
      },
      'postcss-import': {
        name: 'postcss-import',
        ver: expect.any(String),
        type: 'devDependencies',
      },
      'postcss-preset-env': {
        name: 'postcss-preset-env',
        ver: expect.any(String),
        type: 'devDependencies',
      },
    })
  })

  it('contains project level name', () => {
    expect(bud.project.get('name')).toEqual(json.name)
  })

  it('has install function', () => {
    expect(bud.project.peers.install).toBeInstanceOf(Function)
  })

  it('has resolveFrom property', () => {
    expect(bud.project.resolveFrom).toBeInstanceOf(Array)
  })

  it('resolveFrom contains paths of found peers', () => {
    expect(bud.project.resolveFrom).toMatchSnapshot([
      expect.stringContaining('@roots/bud-postcss'),
    ])
  })

  it('has registerDiscovered function', () => {
    expect(bud.project.peers.registerDiscovered).toBeInstanceOf(
      Function,
    )
  })

  it('registerDiscovered method adds extensions', () => {
    bud.project.peers.registerDiscovered()

    expect(bud.extensions.has('@roots/bud-postcss')).toBe(true)
  })
})
