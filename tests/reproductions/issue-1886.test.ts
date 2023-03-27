import {join} from 'node:path'
import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {beforeAll, describe, expect, it} from 'vitest'
import {Filesystem} from '@roots/bud-support/filesystem'

describe('issue-1886', () => {
  let fs: Filesystem
  beforeAll(() => {
    fs = new Filesystem()
  })

  it('should generate webp from png included in js source', async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    await execa(`yarn`, [`bud`, `build`, `--no-log`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    const image = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `images`,
        `generated.bud@1200x630.webp`,
      ),
      `utf8`,
    )
    expect(image.length).toMatchInlineSnapshot('8377')
  })

  it('should generate jpg from png included in js source', async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    await execa(`yarn`, [`bud`, `build`, `--no-log`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    const dist = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `images`,
        `generated.bud@1200x630.jpeg`,
      ),
      `utf8`,
    )
    expect(dist.length).toMatchInlineSnapshot('16877')
  })

  it('should generate webp@50 from png included in js source', async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    await execa(`yarn`, [`bud`, `build`, `--no-log`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    const image = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `images`,
        `generated.bud-50@1200x630.webp`,
      ),
      `utf8`,
    )
    expect(image.length).toMatchInlineSnapshot('6351')
  })

  it('should generate webp from png included in css source', async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    await execa(`yarn`, [`bud`, `build`, `--no-log`, `--debug`], {
      cwd: join(paths.tests, `reproductions`, `issue-1886`),
    })

    const image = await fs.read(
      join(
        paths.tests,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `images`,
        `generated.bud-css@1200x630.webp`,
      ),
      `utf8`,
    )
    expect(image.length).toMatchInlineSnapshot('8377')
  })
}, 120000)
