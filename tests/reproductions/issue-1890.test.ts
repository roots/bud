import {join} from 'node:path'
import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {beforeAll, describe, expect, it} from 'vitest'
import {readFile} from '@roots/bud-support/fs'

describe('issue-1886', () => {
  it('should generate scripts', async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `issue-1890`),
    })

    await execa(`yarn`, [`bud`, `build`, `--no-log`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1890`),
    })

    const normalJs = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1890`,
        `dist`,
        `js`,
        `normal.js`,
      ),
      `utf-8`,
    )
    const simpleJs = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1890`,
        `dist`,
        `js`,
        `simple.js`,
      ),
      `utf-8`,
    )
    const mixedNormalJs = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1890`,
        `dist`,
        `js`,
        `mixedNormal.js`,
      ),
      `utf-8`,
    )
    const mixedSimpleJs = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1890`,
        `dist`,
        `js`,
        `mixedSimple.js`,
      ),
      `utf-8`,
    )

    expect(normalJs.length).toBeGreaterThan(0)
    expect(simpleJs.length).toBeGreaterThan(0)
    expect(mixedNormalJs.length).toBeGreaterThan(0)
    expect(mixedSimpleJs.length).toBeGreaterThan(0)

  })
}, 120000)
