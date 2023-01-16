import {join} from 'node:path'
import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {beforeAll, describe, expect, it} from 'vitest'
import {readFile} from '@roots/bud-support/fs'

describe('issue-1886', () => {
  beforeAll(async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    await execa(`yarn`, [`bud`, `build`, `--no-log`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })
  }, 30000)

  it('should generate webp from png included in js source', async () => {
    const image = await readFile(
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
    expect(image.length).toMatchInlineSnapshot('8377')
  })

  it('should generate jpg from png included in js source', async () => {
    const dist = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `images`,
        `bud.jpeg`,
      ),
      `utf-8`,
    )
    expect(dist.length).toMatchInlineSnapshot('16877')
  })

  it('should generate webp@50 from png included in js source', async () => {
    const image = await readFile(
      join(
        paths.tests,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `images`,
        `bud-50.webp`,
      ),
      `utf-8`,
    )
    expect(image.length).toMatchInlineSnapshot('6351')
  })

  it('should generate webp from png included in css source', async () => {
    const image = await readFile(
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
    expect(image.length).toMatchInlineSnapshot('8377')
  })
})
