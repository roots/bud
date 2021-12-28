import {Bud, factory} from '../../../../util/bud'

describe('bud.project', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.build.make()
  })

  it('contains a repository', () => {
    expect(bud.project.repository).toMatchSnapshot({
      cache: {
        hash: expect.any(String),
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
          conditional: [],
          global: [
            expect.stringContaining('project/bud.config.js'),
          ],
        },
        json: {
          conditional: [],
          global: [],
        },
      },
      dependencies: [
        expect.stringContaining('project/package.json'),
        expect.stringContaining('project/bud.config.js'),
      ],
      env: {
        all: {},
        public: {},
      },
      manifestPath: null,
    })
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
      expect.stringContaining('/packages'),
    ])
  })
})
