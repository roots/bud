import {describe, expect, it} from '@jest/globals'
import fs from 'fs-extra'
import {globby} from 'globby'
import json5 from 'json5'
import {posix as path} from 'node:path'

describe.skip(`repo`, function () {
  let packageRoots

  beforeAll(async () => {
    packageRoots = await globby(`sources/@roots/*`, {
      absolute: true,
      onlyDirectories: true,
    })
  })

  it.skip(`publish check: */lib/cjs/index.js`, async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const cjs = await globby(path.join(pkg, `lib/cjs/index.js`))

          expect(cjs.length).toBe(1)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it.skip(`publish check: */lib/esm/index.js`, async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const esm = await globby(path.join(pkg, `lib/esm/index.js`))

          expect(esm.length).toBe(1)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it.skip(`publish check: */types/index.d.ts`, async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const types = path.join(pkg, `types/index.d.ts`)
          const typesExist = await fs.pathExists(types)
          expect(typesExist).toBe(true)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it.skip(`publish check: project references`, async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const pkgString = await fs.readFile(
            path.join(pkg, `package.json`),
            `utf8`,
          )
          const pkgJson = json5.parse(pkgString)
          const esmString = await fs.readFile(
            path.join(pkg, `tsconfig-esm.json`),
            `utf8`,
          )
          const esmJson = json5.parse(esmString)
          const cjsString = await fs.readFile(
            path.join(pkg, `tsconfig.json`),
            `utf8`,
          )
          const cjsJson = json5.parse(cjsString)

          const workspaceDeps = Object.keys({
            ...(pkgJson.dependencies ?? {}),
            ...(pkgJson.devDependencies ?? {}),
          }).filter(k => k.includes(`@roots/`))

          await Promise.all(
            workspaceDeps.map(async dependency => {
              const cjsRefPath = path.join(
                dependency.split(`@roots/`).pop(),
                `tsconfig.json`,
              )

              try {
                if (cjsJson)
                  expect(
                    cjsJson.references.filter(({path}: {path: string}) => {
                      return path.includes(cjsRefPath)
                    }).length,
                  ).toEqual(1)
              } catch (error) {
                throw new Error(
                  `Problem with cjs references for ${dependency}`,
                )
              }

              const esmRefPath = path.join(
                dependency.split(`@roots/`).pop(),
                `tsconfig-esm.json`,
              )

              try {
                expect(
                  esmJson.references.filter(({path}: {path: string}) => {
                    return path.includes(esmRefPath)
                  }).length,
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

  it.skip(`root: project references`, async () => {
    try {
      const tsConfCjsString = await fs.readFile(
        process.cwd().concat(`/config/tsconfig.json`),
        `utf8`,
      )
      const tsConfCjs = json5.parse(tsConfCjsString)

      await Promise.all(
        packageRoots.map(async pkg => {
          const name = pkg.split(`sources/`).pop().concat(`/tsconfig.json`)

          expect(
            tsConfCjs.references.filter(({path}: {path: string}) => {
              return path.includes(name)
            }).length,
          ).toBe(1)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })
})
