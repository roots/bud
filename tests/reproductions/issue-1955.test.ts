import {join} from 'node:path'
import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {beforeAll, describe, expect, it} from 'vitest'
import {readFile} from '@roots/bud-support/fs'

describe('issue-1995', () => {
  beforeAll(async () => {
    await execa(`yarn`, [`bud`, `clean`, `dist`, `storage`], {
      cwd: join(paths.tests, `reproductions`, `issue-1955`),
    })

    await execa(`yarn`, [`bud`, `build`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1955`),
    })
  }, 30000)

  it('should generate app.js', async () => {
    const file = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1955`,
        `dist`,
        `js`,
        `app.js`,
      ),
      `utf-8`,
    )
    expect(file.length).toBeGreaterThan(0)
  })
}, 120000)
