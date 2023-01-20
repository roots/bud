import {join} from 'node:path'

import {paths} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {readFile} from '@roots/bud-support/fs'
import {beforeAll, describe, expect, it} from 'vitest'

const testDirectory = join(paths.sources, `@roots`, `bud-imagemin`, `test`)

describe(`@roots/bud-imagemin test projects`, () => {
  beforeAll(async () => {
    await Promise.all([`quality-50`, `quality-default`].map(async dir => {
      await execa(`yarn`, [`bud`, `clean`], {
        cwd: join(testDirectory, dir),
      })
      await execa(`yarn`, [`bud`, `build`, `--no-log`, `--debug`], {
        cwd: join(testDirectory, dir),
      })
    }))
  }, 60000)

  it(`should compress png with expected sizes`, async () => {
    const source = await readFile(
      join(
        testDirectory,
        `quality-50`,
        `src`,
        `images`,
        `bud.png`,
      ),
      `utf-8`,
    )
    const quality50 = await readFile(
      join(
        testDirectory,
        `quality-50`,
        `dist`,
        `images`,
        `bud.png`,
      ),
      `utf-8`,
    )
    const qualityDefault = await readFile(
      join(
        testDirectory,
        `quality-default`,
        `dist`,
        `images`,
        `bud.png`,
      ),
      `utf-8`,
    )
    expect(source.length).toMatchInlineSnapshot(`4995`)
    expect(quality50.length).toMatchInlineSnapshot(`4578`)
    expect(qualityDefault.length).toMatchInlineSnapshot(`19315`)
  })

  it(`should generate webp with expected sizes`, async () => {
    const quality50 = await readFile(
      join(
        testDirectory,
        `quality-50`,
        `dist`,
        `images`,
        `generated.bud@1200x630.webp`,
      ),
      `utf-8`,
    )
    const qualityDefault = await readFile(
      join(
        testDirectory,
        `quality-default`,
        `dist`,
        `images`,
        `generated.bud@1200x630.webp`,
      ),
      `utf-8`,
    )
    expect(quality50.length).toMatchInlineSnapshot(`6351`)
    expect(qualityDefault.length).toMatchInlineSnapshot(`8377`)
  })
})
