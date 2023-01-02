import {join} from 'node:path'
import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {beforeAll, describe, expect, it} from 'vitest'
import {readFile} from '@roots/bud-support/fs'

describe('issue-1886', () => {
  beforeAll(async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `issue-1890`),
    })

    await execa(`yarn`, [`bud`, `build`, `--no-log`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1890`),
    })
  }, 30000)

  it('should generate normal.js', async () => {
    const file = await readFile(
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
    expect(file.length).toBeGreaterThan(0)
  })
  it('should generate simple.js', async () => {
    const file = await readFile(
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
    expect(file.length).toBeGreaterThan(0)
  })
  it('should generate mixedNormal.js', async () => {
    const file = await readFile(
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
    expect(file.length).toBeGreaterThan(0)
  })
  it('should generate mixedSimple.js', async () => {
    const file = await readFile(
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
    expect(file.length).toBeGreaterThan(0)
  })
})
