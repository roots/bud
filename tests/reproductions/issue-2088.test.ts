import {join} from 'node:path'
import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {describe, expect, it} from 'vitest'
import {readFile} from '@roots/bud-support/fs'

describe('issue-2088', () => {
  it('should generate app.js', async () => {
    await execa(`yarn`, [`bud`, `clean`, `@dist`], {
      cwd: join(paths.tests, `reproductions`, `issue-2088`),
    })

    await execa(`yarn`, [`bud`, `build`, `--force`, `--minimize`], {
      cwd: join(paths.tests, `reproductions`, `issue-2088`),
    })

    const file = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-2088`,
        `dist`,
        `js`,
        `main.js`,
      ),
      `utf-8`,
    )
    expect(file.length).toBeLessThan(65000)
  }, 300000)
})
