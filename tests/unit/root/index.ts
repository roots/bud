import {globby} from '@roots/bud-support'
import {pathExists, readJson} from 'fs-extra'
import {posix as path} from 'path'

describe('repo', function () {
  let packageRoots

  beforeAll(async () => {
    packageRoots = await globby('packages/@roots/*', {
      absolute: true,
      onlyDirectories: true,
    })
  })

  it('publish check: */lib/cjs/index.js', async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const cjs = await globby(
            path.join(pkg, 'lib/cjs/index.js'),
          )

          expect(cjs.length).toBe(1)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it('publish check: */lib/esm/index.js', async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const esm = await globby(
            path.join(pkg, 'lib/esm/index.js'),
          )

          expect(esm.length).toBe(1)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it('publish check: */types/index.d.ts', async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const types = path.join(pkg, 'types/index.d.ts')
          const typesExist = await pathExists(types)
          expect(typesExist).toBe(true)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it.skip('publish check: project references', async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const pkgJson = await readJson(
            path.join(pkg, 'package.json'),
          )
          const esmJson = await readJson(
            path.join(pkg, 'tsconfig-esm.json'),
          )
          const cjsJson = await readJson(
            path.join(pkg, 'tsconfig.json'),
          )

          const workspaceDeps = Object.keys({
            ...(pkgJson.dependencies ?? {}),
            ...(pkgJson.devDependencies ?? {}),
          }).filter(k => k.includes('@roots/'))

          await Promise.all(
            workspaceDeps.map(async dependency => {
              const cjsRefPath = path.join(
                dependency.split('@roots/').pop(),
                `tsconfig.json`,
              )

              try {
                if (cjsJson)
                  expect(
                    cjsJson.references.filter(
                      ({path}: {path: string}) => {
                        return path.includes(cjsRefPath)
                      },
                    ).length,
                  ).toEqual(1)
              } catch (error) {
                throw new Error(
                  `Problem with cjs references for ${dependency}`,
                )
              }

              const esmRefPath = path.join(
                dependency.split('@roots/').pop(),
                `tsconfig-esm.json`,
              )

              try {
                expect(
                  esmJson.references.filter(
                    ({path}: {path: string}) => {
                      return path.includes(esmRefPath)
                    },
                  ).length,
                ).toEqual(1)
              } catch (error) {
                throw new Error(
                  `Problem with mjs references for ${dependency}`,
                )
              }
            }),
          )
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it('root: project references', async () => {
    try {
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
    } catch (error) {
      throw new Error(error)
    }
  })
})
