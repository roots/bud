import {join} from 'node:path'

import {path} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {Filesystem} from '@roots/bud-support/filesystem'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`issue-2518`, () => {
  let fs: Filesystem

  beforeAll(() => {
    fs = new Filesystem()
  })

  it(`should generate expected output`, async () => {
    await execa(`yarn`, [`bud`, `clean`, `dist`, `storage`], {
      cwd: path(`tests`, `reproductions`, `issue-2518`),
    })

    await execa(`yarn`, [`bud`, `build`], {
      cwd: path(`tests`, `reproductions`, `issue-2518`),
    })

    const css = await fs.read(
      path(
        `tests`,
        `reproductions`,
        `issue-2518`,
        `dist`,
        `css`,
        `main.css`,
      ),
      `utf8`,
    )
    expect(css).toMatch(/data:image\/svg\+xml;/)
  })
}, 240000)
