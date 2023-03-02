import {join} from 'node:path'
import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {describe, expect, it} from 'vitest'
import {readFile} from '@roots/bud-support/fs'

describe('issue-2126', () => {
  it('should generate expected output', async () => {
    await execa(`yarn`, [`bud`, `clean`, `dist`, `storage`], {
      cwd: join(paths.tests, `reproductions`, `issue-2126`),
    })

    await execa(`yarn`, [`bud`, `build`], {
      cwd: join(paths.tests, `reproductions`, `issue-2126`),
    })

    const js = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-2126`,
        `public`,
        `js`,
        `app.js`,
      ),
      `utf-8`,
    )
    expect(js.length).toBeLessThan(65000)

    const css = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-2126`,
        `public`,
        `css`,
        `app.css`,
      ),
      `utf-8`,
    )
    expect(css.includes(`body{width:100%}`)).toBeTruthy()
    expect(css.includes(`list-style-type:none`)).toBeTruthy()
    expect(css.includes(`color:#00c185`)).toBeTruthy()
  })
}, 240000)
