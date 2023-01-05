import {join} from 'node:path'
import {paths} from '@repo/constants'
import execa, {ExecaReturnValue} from '@roots/bud-support/execa'
import {beforeAll, describe, expect, it} from 'vitest'
import fs from '@roots/bud-support/fs-jetpack'

describe('issue-error-code', () => {
  let child: ExecaReturnValue

  beforeAll(async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `error-code`),
    })

    try {
      child = await execa(`yarn`, [`bud`, `build`], {
        cwd: join(paths.tests, `reproductions`, `error-code`),
        reject: false,
      })
    } catch (error) {}
  }, 30000)

  it('should have an exit code of 1', async () => {
    expect(child.failed).toBe(true)
  })

  it('should not generate app.css', async () => {
    expect(
      await fs.existsAsync(
        join(
          paths.tests,
          `reproductions`,
          `error-code`,
          `dist`,
          `js`,
          `app.css`,
        ),
      ),
    ).toBe(false)
  })
})
