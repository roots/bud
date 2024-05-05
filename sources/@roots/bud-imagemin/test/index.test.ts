import {join} from 'node:path'

import {path} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import * as fs from 'fs-jetpack'
import {beforeAll, describe, expect, it} from 'vitest'

const testDirectory = path(`sources`, `@roots`, `bud-imagemin`, `test`)

describe(`@roots/bud-imagemin test projects`, () => {
  beforeAll(async () => {
    await Promise.all(
      [`quality-50`, `quality-default`].map(async dir => {
        await execa(`yarn`, [`bud`, `clean`, `--silent`], {
          cwd: join(testDirectory, dir),
        })
        await execa(`yarn`, [`bud`, `build`, `--silent`, `--no-cache`], {
          cwd: join(testDirectory, dir),
        })
      }),
    )
  }, 60000)

  it(`should compress png with expected sizes`, async () => {
    const source = await fs.readAsync(
      join(testDirectory, `quality-50`, `src`, `images`, `bud.png`),
      `utf8`,
    )
    const quality50 = await fs.readAsync(
      join(testDirectory, `quality-50`, `dist`, `images`, `bud.png`),
      `utf8`,
    )
    const qualityDefault = await fs.readAsync(
      join(testDirectory, `quality-default`, `dist`, `images`, `bud.png`),
      `utf8`,
    )

    expect(source?.length).toMatchInlineSnapshot(`4995`)
    expect(quality50?.length).toMatchInlineSnapshot(`undefined`)
    expect(qualityDefault?.length).toMatchInlineSnapshot(`undefined`)
  })

  it(`should generate webp with expected sizes`, async () => {
    const quality50 = await fs.readAsync(
      join(
        testDirectory,
        `quality-50`,
        `dist`,
        `images`,
        `generated.bud@1200x630.webp`,
      ),
      `utf8`,
    )
    const qualityDefault = await fs.readAsync(
      join(
        testDirectory,
        `quality-default`,
        `dist`,
        `images`,
        `generated.bud@1200x630.webp`,
      ),
      `utf8`,
    )
    expect(quality50?.length).toMatchInlineSnapshot(`undefined`)
    expect(qualityDefault?.length).toMatchInlineSnapshot(`undefined`)
  })
})
