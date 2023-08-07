import {join} from 'node:path'

import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {Filesystem} from '@roots/bud-support/filesystem'
import {beforeAll, describe, expect, it} from 'vitest'
describe(`issue-2126`, () => {
  let fs: Filesystem
  beforeAll(() => {
    fs = new Filesystem()
  })
  it(`should generate expected output`, async () => {
    await execa(`yarn`, [`bud`, `clean`, `dist`, `storage`], {
      cwd: join(paths.tests, `reproductions`, `issue-2126`),
    })

    await execa(`yarn`, [`bud`, `build`], {
      cwd: join(paths.tests, `reproductions`, `issue-2126`),
    })

    const js = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-2126`,
        `public`,
        `js`,
        `app.js`,
      ),
      `utf8`,
    )
    expect(js.length).toBeLessThan(75000)
    const css = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-2126`,
        `public`,
        `css`,
        `app.css`,
      ),
      `utf8`,
    )
    expect(css.includes(`body{width:100%}`)).toBeTruthy()
    expect(css.includes(`list-style-type:none`)).toBeTruthy()
    expect(css.includes(`color:#00c185`)).toBeTruthy()
  })
}, 240000)
