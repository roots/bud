import {path} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {Filesystem} from '@roots/bud-support/filesystem'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`issue-2088`, () => {
  let fs: Filesystem

  beforeAll(() => {
    fs = new Filesystem()
  })
  it(`should generate app.js`, async () => {
    await execa(`yarn`, [`bud`, `clean`, `dist`, `storage`], {
      cwd: path(`tests`, `reproductions`, `issue-2088`),
    })

    await execa(`yarn`, [`bud`, `build`, `--minimize`], {
      cwd: path(`tests`, `reproductions`, `issue-2088`),
    })

    const file = await fs.read(
      path(
        `tests`,
        `reproductions`,
        `issue-2088`,
        `dist`,
        `js`,
        `main.js`,
      ),
      `utf8`,
    )
    expect(file.length).toBeLessThan(65000)
  })
}, 240000)
