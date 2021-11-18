import {globby} from '@roots/bud-support'
import {readJson} from 'fs-extra'

describe('repo', function () {
  let packageRoots

  beforeAll(async () => {
    packageRoots = await globby('packages/@roots/*', {
      absolute: true,
      onlyDirectories: true,
    })
  })

  it('publish check: */lib/cjs/index.js', async () => {
    await Promise.all(
      packageRoots.map(async pkg => {
        const cjs = await globby(pkg.concat('/lib/cjs/index.js'))

        expect(cjs.length).toBe(1)
      }),
    )
  })

  it('publish check: */lib/esm/index.js', async () => {
    await Promise.all(
      packageRoots.map(async pkg => {
        const esm = await globby(pkg.concat('/lib/esm/index.js'))

        expect(esm.length).toBe(1)
      }),
    )
  })

  it('publish check: */lib/esm/index.js', async () => {
    await Promise.all(
      packageRoots.map(async pkg => {
        const types = await globby(
          pkg.concat('/types/index.d.ts'),
        )

        expect(types.length).toBe(1)
      }),
    )
  })

  it('publish check: project references', async () => {
    Promise.all(
      packageRoots.map(async pkg => {
        const pkgJson = await readJson(
          pkg.concat('/package.json'),
        )
        const esmJson = await readJson(
          pkg.concat('/tsconfig-esm.json'),
        )
        const cjsJson = await readJson(
          pkg.concat('/tsconfig.json'),
        )

        const workspaceDeps = Object.keys({
          ...(pkgJson.dependencies ?? {}),
          ...(pkgJson.devDependencies ?? {}),
        }).filter(k => k.includes('@roots/'))

        await Promise.all(
          workspaceDeps.map(async dependency => {
            const cjsRefPath = `${dependency
              .split('@roots/')
              .pop()}/tsconfig.json`

            expect(
              cjsJson.references.filter(
                ({path}: {path: string}) => {
                  return path.includes(cjsRefPath)
                },
              ).length,
            ).toEqual(1)

            const esmRefPath = `${dependency
              .split('@roots/')
              .pop()}/tsconfig-esm.json`

            expect(
              esmJson.references.filter(
                ({path}: {path: string}) => {
                  return path.includes(esmRefPath)
                },
              ).length,
            ).toEqual(1)
          }),
        )
      }),
    )
  })

  it('root: project references', async () => {
    const tsConfCjs = await readJson(
      process.cwd().concat('/tsconfig.json'),
    )
    await Promise.all(
      packageRoots.map(async pkg => {
        const name = pkg
          .split(`packages/`)
          .pop()
          .concat('/tsconfig.json')

        expect(
          tsConfCjs.references.filter(
            ({path}: {path: string}) => {
              return path.includes(name)
            },
          ).length,
        ).toBe(1)
      }),
    )

    const tsConfEsm = await readJson(
      process.cwd().concat('/tsconfig.esm.json'),
    )
    await Promise.all(
      packageRoots.map(async pkg => {
        const name = pkg
          .split(`packages/`)
          .pop()
          .concat('/tsconfig-esm.json')

        expect(
          tsConfEsm.references.filter(
            ({path}: {path: string}) => {
              return path.includes(name)
            },
          ).length,
        ).toBe(1)
      }),
    )
  })
})
