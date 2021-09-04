import {globby} from '@roots/bud-support'
import {readFile, readJsonSync} from 'fs-extra'
import {join} from 'path'

describe('repo', function () {
  describe('publish check: */lib/cjs/index.js', () => {
    globby
      .globbySync('packages/@roots/*', {
        absolute: true,
        onlyDirectories: true,
      })
      .map(pkg => {
        const name = pkg.split(`packages/`).pop()

        it(`${name} has cjs`, done => {
          const cjs = globby.globbySync(
            pkg.concat('/lib/cjs/index.js'),
          )

          expect(cjs.length).toBe(1)
          done()
        })
      })
  })

  describe('publish check: */lib/esm/index.js', () => {
    globby
      .globbySync('packages/@roots/*', {
        absolute: true,
        onlyDirectories: true,
      })
      .map(pkg => {
        const name = pkg.split(`packages/`).pop()

        it(`${name} has esm`, done => {
          const esm = globby.globbySync(
            pkg.concat('/lib/esm/index.js'),
          )

          expect(esm.length).toBe(1)
          done()
        })
      })
  })

  describe('publish check: */LICENSE.md', () => {
    globby
      .globbySync('packages/@roots/*', {
        absolute: true,
        onlyDirectories: true,
      })
      .map(pkg => {
        const name = pkg.split(`packages/`).pop()

        it(`${name} has LICENSE.md`, done => {
          const esm = globby.globbySync(
            pkg.concat('/LICENSE.md'),
          )

          expect(esm.length).toBe(1)
          done()
        })
      })
  })

  describe('publish check: */README.md', () => {
    globby
      .globbySync('packages/@roots/*', {
        absolute: true,
        onlyDirectories: true,
      })
      .map(pkg => {
        const name = pkg.split(`packages/`).pop()

        it(`${name} has README.md`, done => {
          const esm = globby.globbySync(pkg.concat('/README.md'))

          expect(esm.length).toBe(1)
          done()
        })
      })
  })

  describe('publish check: types', () => {
    globby
      .globbySync('packages/@roots/*', {
        absolute: true,
        onlyDirectories: true,
      })
      .map(pkg => {
        const name = pkg.split(`packages/`).pop()

        it(`${name} esm types`, done => {
          const esm = globby.globbySync(
            pkg.concat('/types/index.d.ts'),
          )

          expect(esm.length).toBe(1)
          done()
        })
      })
  })

  describe('publish check: project references', () => {
    globby
      .globbySync('packages/@roots/*', {
        absolute: true,
        onlyDirectories: true,
      })
      .map(pkg => {
        const name = pkg.split(`packages/`).pop()

        const pkgJson = readJsonSync(pkg.concat('/package.json'))
        const esmJson = readJsonSync(
          pkg.concat('/tsconfig-esm.json'),
        )
        const cjsJson = readJsonSync(
          pkg.concat('/tsconfig.json'),
        )

        const workspaceDeps = Object.keys({
          ...(pkgJson.dependencies ?? {}),
          ...(pkgJson.devDependencies ?? {}),
        }).filter(k => k.includes('@roots/'))

        workspaceDeps.map(dependency => {
          it(`[${name}] ${dependency} has a ts reference (cjs)`, done => {
            const refPath = `${dependency
              .split('@roots/')
              .pop()}/tsconfig.json`

            expect(
              cjsJson.references.filter(
                ({path}: {path: string}) => {
                  return path.includes(refPath)
                },
              ).length,
            ).toEqual(1)

            done()
          })

          it(`[${name}] ${dependency} has a ts reference (esm)`, done => {
            const refPath = `${dependency
              .split('@roots/')
              .pop()}/tsconfig-esm.json`

            expect(
              esmJson.references.filter(
                ({path}: {path: string}) => {
                  return path.includes(refPath)
                },
              ).length,
            ).toEqual(1)

            done()
          })
        })
      })
  })

  it('root: LICENSE.md matches snapshot', async () => {
    const artifact = await readFile(
      join(process.cwd(), 'LICENSE.md'),
    )

    expect(artifact.toString()).toMatchSnapshot()
  })

  describe('root: project references', () => {
    const tsConfCjs = readJsonSync(
      process.cwd().concat('/tsconfig.json'),
    )
    const tsConfEsm = readJsonSync(
      process.cwd().concat('/tsconfig.esm.json'),
    )

    globby
      .globbySync('packages/@roots/*', {
        absolute: true,
        onlyDirectories: true,
      })
      .map(pkg => {
        const name = pkg
          .split(`packages/`)
          .pop()
          .concat('/tsconfig.json')

        it(`has cjs ref for ${name}`, done => {
          expect(
            tsConfCjs.references.filter(
              ({path}: {path: string}) => {
                return path.includes(name)
              },
            ).length,
          ).toBe(1)
          done()
        })
      })

    globby
      .globbySync('packages/@roots/*', {
        absolute: true,
        onlyDirectories: true,
      })
      .map(pkg => {
        const name = pkg
          .split(`packages/`)
          .pop()
          .concat('/tsconfig-esm.json')

        it(`has esm ref for ${name}`, done => {
          expect(
            tsConfEsm.references.filter(
              ({path}: {path: string}) => {
                return path.includes(name)
              },
            ).length,
          ).toBe(1)
          done()
        })
      })
  })
})
