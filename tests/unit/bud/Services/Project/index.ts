import {config, factory, Framework} from '@roots/bud'
import {Peers} from '@roots/bud/src/services/Project/peers/peers.service'
import {readJson} from 'fs-extra'

describe.skip('bud.project', function () {
  let bud: Framework
  let json: any

  beforeAll(async () => {
    const project = process.cwd().concat('/examples/babel')
    json = await readJson(project.concat('/package.json'))

    bud = await factory({
      config: {
        ...config,
        ci: true,
        location: {
          ...config.location,
          project,
        },
      },
    })
  })

  it('contains a repository', () => {
    expect(bud.project.repository).toMatchSnapshot({
      cache: {
        directory: expect.any(String),
        file: expect.stringContaining('bud.profile.json'),
      },
      cli: {
        args: {},
        argv: [],
        flags: {},
        metadata: {},
        raw: [],
      },
      configs: {
        dynamic: {
          conditional: null,
          global: null,
        },
        json: {
          conditional: null,
          global: null,
        },
      },
      dependencies: [
        expect.stringContaining('babel/package.json'),
      ],
      env: {
        all: undefined,
        public: {},
      },
      extensions: {
        '@roots/bud-babel': {
          bud: {
            type: 'extension',
          },
          dependencies: {
            '@babel/core': expect.any(String),
            '@babel/plugin-proposal-class-properties':
              expect.any(String),
            '@babel/plugin-proposal-object-rest-spread':
              expect.any(String),
            '@babel/plugin-syntax-dynamic-import':
              expect.any(String),
            '@babel/plugin-transform-runtime':
              expect.any(String),
            '@babel/preset-env': expect.any(String),
            'babel-loader': expect.any(String),
            'babel-plugin-add-module-exports':
              expect.any(String),
            tslib: expect.any(String),
          },
          name: '@roots/bud-babel',
          path: expect.stringContaining('@roots/bud-babel'),
          peerDependencies: undefined,
          version: expect.any(String),
        },
      },
      manifestPath: expect.stringContaining(
        'babel/package.json',
      ),
      peers: {},
      resolve: [expect.stringContaining('@roots/bud-babel')],
      unmet: [],
    })
  })

  it('has hasPeerDependency function', () => {
    expect(bud.project.hasPeerDependency).toBeInstanceOf(
      Function,
    )
  })

  it('discover method gathers dep data', () => {
    bud.project.peers = new Peers(bud)

    expect(
      bud.project.get(`extensions.@roots/bud-babel`),
    ).toMatchSnapshot({
      name: '@roots/bud-babel',
      bud: {type: 'extension'},
      path: expect.stringContaining('@roots/bud-babel'),
      version: expect.any(String),
    })
  })

  it('contains project level name', () => {
    expect(bud.project.get('manifest.name')).toEqual(json.name)
  })

  it('has resolveFrom property', () => {
    expect(bud.project.get('dependencies')).toBeInstanceOf(Array)
  })

  it('resolveFrom contains paths of found peers', () => {
    expect(bud.project.get('dependencies')).toMatchSnapshot([
      expect.stringContaining('babel/package.json'),
    ])

    bud.build.make()

    expect(bud.build.config.resolve.modules).toMatchSnapshot([
      expect.stringContaining('src'),
      expect.stringContaining('node_modules'),
      expect.stringContaining('@roots/bud-babel'),
    ])
  })
})
