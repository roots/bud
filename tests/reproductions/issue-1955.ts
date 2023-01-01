import {join} from 'node:path'
import {paths} from '@repo/constants'
import {execa} from 'execa'
import {beforeAll, describe, expect, it} from 'vitest'
import {readFile} from 'fs-extra'

describe('issue-1886', () => {
  beforeAll(async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `react-18`),
    })

    await execa(`yarn`, [`bud`, `build`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `react-18`),
    })
  }, 30000)

  it('should generate app.js', async () => {
    const file = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `react-18`,
        `dist`,
        `js`,
        `app.js`,
      ),
      `utf-8`,
    )
    expect(file.length).toBeGreaterThan(0)
  })
})
