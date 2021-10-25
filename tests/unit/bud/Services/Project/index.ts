import {config, factory, Framework} from '@roots/bud'
import {readJson} from 'fs-extra'

describe('bud.project', function () {
  let bud: Framework
  let json: any

  beforeAll(async () => {
    const project = process.cwd().concat('/examples/babel')
    json = await readJson(project.concat('/package.json'))

    bud = factory({
      config: {
        ...config,
        location: {
          ...config.location,
          project,
        },
      },
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('contains a repository', () => {
    expect(bud.project.repository).toMatchSnapshot()
  })

  it('has hasPeerDependency function', () => {
    expect(bud.project.hasPeerDependency).toBeInstanceOf(
      Function,
    )
  })

  it('discover method gathers dep data', () => {
    bud.project.peers.discover(`devDependencies`)

    expect(
      bud.project.get(`extensions.@roots/bud-babel`),
    ).toMatchSnapshot({
      name: '@roots/bud-babel',
      bud: {type: 'extension'},
      path: '/Volumes/Samsung/Code/roots/bud/packages/@roots/bud-babel',
      dependsOn: [],
      provides: {
        '@babel/core': expect.any(String),
        '@babel/plugin-proposal-class-properties':
          expect.any(String),
        '@babel/plugin-proposal-object-rest-spread':
          expect.any(String),
        '@babel/plugin-syntax-dynamic-import':
          expect.any(String),
        '@babel/plugin-transform-runtime': expect.any(String),
        '@babel/preset-env': expect.any(String),
        '@roots/bud-build': expect.any(String),
        'babel-loader': expect.any(String),
        'babel-plugin-add-module-exports': expect.any(String),
        tslib: expect.any(String),
      },
      version: '5.0.0-next.6',
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
      expect.stringContaining('@roots/bud-babel'),
      expect.stringContaining('@roots/bud'),
      expect.stringContaining('@roots/bud-build'),
    ])

    const config = bud.build.make()

    expect(config.resolve.modules).toMatchSnapshot([
      expect.stringContaining('examples/babel/src'),
      expect.stringContaining('examples/babel/node_modules'),
      expect.stringContaining('@roots/bud-babel'),
      expect.stringContaining('@roots/bud'),
      expect.stringContaining('@roots/bud-build'),
    ])
  })
})
