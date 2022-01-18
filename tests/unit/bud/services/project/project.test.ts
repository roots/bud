import { fs } from '@roots/bud-support'
import { Bud, factory } from '../../../../util/bud'

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

  it('has a cache string', () => {
    expect(bud.project.get('cache')).toMatchSnapshot({
      hash: expect.any(String)
    })
  })

  it('has cache dependencies', () => {
    expect(bud.project.get('dependencies')).toMatchSnapshot([
      expect.stringContaining('project/package.json'),
      expect.stringContaining('project/bud.config.js')
    ])
  })

  it('has a record of .env values', () => {
    expect(bud.project.get('env.all')).toMatchSnapshot({
      TEST: 'VALUE',
      PUBLIC_APP_TEST: 'PUBLIC_VALUE'
    })
    expect(bud.project.get('env.public')).toMatchSnapshot({
      APP_TEST: 'PUBLIC_VALUE'
    })
  })
  it('has profile records matching runtime records', () => {
    expect(bud.project.get('env.all')).toMatchSnapshot(profile.env.all)
    expect(bud.project.get('env.public')).toMatchSnapshot(profile.env.public)
  })

  it('has a cli object', () => {
    expect(bud.project.get('cli')).toMatchSnapshot({
      args: {},
      argv: [],
      flags: {},
      metadata: {},
      raw: [],
    })
  })

  it('has the path to the bud.config.js config', () => {
    expect(bud.project.get('configs.dynamic.global')).toMatchSnapshot([expect.stringContaining('project/bud.config.js')])
    expect(bud.project.get('configs.dynamic.conditional')).toMatchSnapshot([])
    expect(bud.project.get('configs.json.conditional')).toMatchSnapshot([])
    expect(bud.project.get('configs.json.global')).toMatchSnapshot([])
  })

  it('has a record of all installed modules', () => {
    expect(bud.project.get('installed')).toStrictEqual({
      ...(manifest?.dependencies ?? {}),
      ...(manifest?.devDependencies ?? {}),
    })
  })

  it('has a manifest record', () => {
    expect(bud.project.get('manifest')).toStrictEqual(manifest)
  })

  it('references @roots/bud', () => {
    expect(bud.project.get('modules.@roots/bud')).toMatchSnapshot({
      "bud": null,
      "name": "@roots/bud",
      "peerDependencies": {},
      "requires": [],
      "resolvable": true,
      "version": expect.any(String),
    })
  })

  it('references @roots/bud-babel', () => {
    expect(bud.project.get('modules.@roots/bud-babel')).toMatchSnapshot({
      "bud": {"type": "extension"},
      "name": "@roots/bud-babel",
      "peerDependencies": {},
      "requires": [],
      "resolvable": true,
      "version": expect.any(String),
    })
  })

  it('references @roots/bud-entrypoints', () => {
    expect(bud.project.get('modules.@roots/bud-entrypoints')).toMatchSnapshot({
      "bud": {
        "type": "extension",
      },
      "name": "@roots/bud-entrypoints",
      "peerDependencies": {},
      "requires": [],
      "resolvable": true,
      "version": expect.any(String),
    })
  })

  it('references @roots/bud-eslint', () => {
    expect(bud.project.get('modules.@roots/bud-eslint')).toMatchSnapshot({
        "bud": {
          "type": "extension",
        },
        "name": "@roots/bud-eslint",
        "peerDependencies": {
          "eslint": profile.modules.eslint.version,
        },
        "requires": [
          [
            "eslint",
            profile.modules.eslint.version,
          ],
        ],
        "resolvable": true,
        "version": expect.any(String),
    })
  })

  it('references @roots/bud-postcss', () => {
    expect(bud.project.get('modules.@roots/bud-postcss')).toMatchSnapshot({
        "bud": {
          "type": "extension",
        },
        "name": "@roots/bud-postcss",
        "peerDependencies": {
          "postcss": profile.modules.postcss.version,
          "postcss-import": profile.modules['postcss-import'].version,
          "postcss-nested": profile.modules['postcss-nested'].version,
          "postcss-preset-env": profile.modules['postcss-preset-env'].version,
        },
        "requires": [
          [
            "postcss",
            profile.modules.postcss.version,
          ],
          [
            "postcss-import",
            profile.modules['postcss-import'].version,
          ],
          [
            "postcss-nested",
            profile.modules['postcss-nested'].version,
          ],
          [
            "postcss-preset-env",
            profile.modules['postcss-preset-env'].version,
          ],
        ],
        "resolvable": true,
        "version": expect.any(String),
      })
  })
  

  it('references @roots/bud-entrypoints', () => {
    expect(bud.project.get('modules.@roots/bud-entrypoints')).toMatchSnapshot({
      "bud": {
        "type": "extension",
      },
      "name": "@roots/bud-entrypoints",
      "peerDependencies": {},
      "requires": [],
      "resolvable": true,
      "version": expect.any(String),
    })
  })

  it('references @roots/bud-preset-recommend', () => {
    expect(bud.project.get('modules.@roots/bud-preset-recommend')).toMatchSnapshot({
      "bud": {
            "peers": [
              "@roots/bud-babel",
              "@roots/bud-entrypoints",
              "@roots/bud-eslint",
              "@roots/bud-postcss",
            ],
            "type": "extension",
          },
          "name": "@roots/bud-preset-recommend",
          "peerDependencies": {},
          "requires": [
            [
              "@roots/bud-babel",
              expect.any(String),
            ],
            [
              "@roots/bud-entrypoints",
              expect.any(String),
            ],
            [
              "@roots/bud-eslint",
              expect.any(String),
            ],
            [
              "@roots/bud-postcss",
              expect.any(String),
            ],
          ],
          "resolvable": true,
          "version": expect.any(String),
    })
  })

  it('references the root package', () => {
    expect(bud.project.get('modules.root')).toMatchSnapshot({
      "browserslist": [
            "extends @wordpress/browserslist-config",
          ],
          "bud": null,
          "devDependencies": {
            "@roots/bud": "workspace:*",
            "@roots/bud-babel": "workspace:*",
            "@roots/bud-postcss": "workspace:*",
            "@roots/bud-preset-recommend": "workspace:*",
            "@roots/bud-tailwindcss": "workspace:*",
            "postcss": profile.modules['postcss'].version,
            "postcss-import": profile.modules['postcss-import'].version,
            "postcss-nested": profile.modules['postcss-nested'].version,
            "postcss-preset-env": profile.modules['postcss-preset-env'].version,
          },
          "name": "root",
          "parent": null,
          "private": true,
          "requires": [
            [
              "@roots/bud",
              "workspace:*",
            ],
            [
              "@roots/bud-babel",
              "workspace:*",
            ],
            [
              "@roots/bud-postcss",
              "workspace:*",
            ],
            [
              "@roots/bud-preset-recommend",
              "workspace:*",
            ],
            [
              "@roots/bud-tailwindcss",
              "workspace:*",
            ],
            [
              "postcss",
              profile.modules['postcss'].version,
            ],
            [
              "postcss-import",
              profile.modules['postcss-import'].version,
            ],
            [
              "postcss-nested",
              profile.modules['postcss-nested'].version,
            ],
            [
              "postcss-preset-env",
              profile.modules['postcss-preset-env'].version,
            ],
          ],
          "resolvable": true,
          "version": expect.any(String),
    })
  })

    it('has a reference to @roots/bud-tailwindcss', () => {
    expect(bud.project.get('modules.@roots/bud-tailwindcss')).toMatchSnapshot({
          "bud": {
            "peers": [
              "@roots/bud-postcss",
            ],
            "type": "extension",
          },
          "name": "@roots/bud-tailwindcss",
          "peerDependencies": {
            "tailwindcss": profile.modules['tailwindcss'].version,
          },
          "requires": [
            [
              "tailwindcss",
              profile.modules['tailwindcss'].version,
            ],
            [
              "@roots/bud-postcss",
              expect.any(String),
            ],
          ],
          "resolvable": true,
          "version": expect.any(String),
    })
    })
  
   it('has references to upstream modules', () => {
    expect(bud.project.isUndefined('modules.eslint')).toBeFalsy()
    expect(bud.project.isUndefined('modules.postcss')).toBeFalsy()
    expect(bud.project.isUndefined('modules.postcss-import')).toBeFalsy()
    expect(bud.project.isUndefined('modules.postcss-nested')).toBeFalsy()
     expect(bud.project.isUndefined('modules.postcss-preset-env')).toBeFalsy()
    expect(bud.project.isUndefined('modules.tailwindcss')).toBeFalsy()
   })
  
     it('matches expected adjacency array', () => {
    expect(bud.project.get('adjacents')).toMatchSnapshot()
  })

  it('has hasPeerDependency function', () => {
    expect(bud.project.hasPeerDependency).toBeInstanceOf(
      Function,
    )
  })

  it('has resolveFrom property', () => {
    expect(bud.project.get('dependencies')).toBeInstanceOf(Array)
  })

  it('resolveFrom contains paths of found peers', async () => {
    expect(bud.project.get('dependencies')).toMatchSnapshot([
      expect.stringContaining('project/package.json'),
      expect.stringContaining('project/bud.config.js'),
    ])

    await bud.build.make()

    expect(bud.build.config.resolve.modules).toMatchSnapshot([
      expect.stringContaining('src'),
      expect.stringContaining('node_modules'),
      expect.stringContaining('/sources'),
    ])
  })
})
