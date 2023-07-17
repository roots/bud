import {join} from 'node:path'

import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {Filesystem} from '@roots/bud-support/filesystem'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`issue-1890`, () => {
  let fs: Filesystem
  beforeAll(() => {
    fs = new Filesystem()
  })

  it(`should generate scripts`, async () => {
    await execa(`yarn`, [`bud`, `clean`, `--silent`], {
      cwd: join(paths.tests, `reproductions`, `issue-1890`),
    })

    await execa(`yarn`, [`bud`, `build`, `--silent`], {
      cwd: join(paths.tests, `reproductions`, `issue-1890`),
    })

    const normalJs = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-1890`,
        `dist`,
        `js`,
        `normal.js`,
      ),
      `utf8`,
    )
    const simpleJs = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-1890`,
        `dist`,
        `js`,
        `simple.js`,
      ),
      `utf8`,
    )
    const mixedNormalJs = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-1890`,
        `dist`,
        `js`,
        `mixedNormal.js`,
      ),
      `utf8`,
    )
    const mixedSimpleJs = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-1890`,
        `dist`,
        `js`,
        `mixedSimple.js`,
      ),
      `utf8`,
    )

    expect(normalJs.length).toBeGreaterThan(0)
    expect(simpleJs.length).toBeGreaterThan(0)
    expect(mixedNormalJs.length).toBeGreaterThan(0)
    expect(mixedSimpleJs.length).toBeGreaterThan(0)
  })
}, 120000)
