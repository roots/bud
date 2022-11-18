import {join} from 'node:path'
import {paths} from '@repo/constants'
import {execa} from 'execa'
import {beforeEach, describe, expect, it} from 'vitest'
import {readFile} from 'fs-extra'

describe('issue-1886', () => {
  beforeEach(async () => {
    await execa(`yarn`, [`clean`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    await execa(`yarn`, [`build`, `--no-log`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })
  })

  it('should generate webp from png included in js source', async () => {
    const webp = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `images`,
        `bud.webp`,
      ),
      `utf-8`,
    )
    expect(webp.length).toMatchInlineSnapshot('16695')
  })

  it('should generate webp from png included in css source', async () => {
    const webp = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `images`,
        `bud-css.webp`,
      ),
      `utf-8`,
    )
    expect(webp.length).toMatchInlineSnapshot('16695')
  })
})
