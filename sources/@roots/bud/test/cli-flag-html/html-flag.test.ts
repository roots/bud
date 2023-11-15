import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {expect, test} from 'vitest'

test(`--html`, async () => {
  await fs.removeAsync(
    path(`sources/@roots/bud/test/cli-flag-html/project/dist`),
  )

  await execa(`yarn`, [
    `workspace`,
    `@tests/html-flag`,
    `run`,
    `bud`,
    `build`,
    `--html`,
  ])

  expect(
    await fs.existsAsync(
      path(
        `sources/@roots/bud/test/cli-flag-html/project/dist/index.html`,
      ),
    ),
  ).toBe(`file`)

  await fs.removeAsync(
    path(`sources/@roots/bud/test/cli-flag-html/project/dist`),
  )

  await execa(`yarn`, [
    `workspace`,
    `@tests/html-flag`,
    `run`,
    `bud`,
    `build`,
    `--no-html`,
  ])

  expect(
    await fs.existsAsync(
      path(
        `sources/@roots/bud/test/cli-flag-html/project/dist/index.html`,
      ),
    ),
  ).toBe(false)
})
