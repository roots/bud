import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {expect, test} from 'vitest'

test(`--hash`, async () => {
  await fs.removeAsync(
    path(`sources/@roots/bud/test/cli-flag-hash/project/dist`),
  )

  await execa(`yarn`, [
    `workspace`,
    `@tests/bud-hash-flag`,
    `run`,
    `bud`,
    `build`,
    `--hash`,
  ])

  expect(
    await fs.existsAsync(
      path(
        `sources/@roots/bud/test/cli-flag-hash/project/dist/js/main.js`,
      ),
    ),
  ).toBe(false)

  await execa(`yarn`, [
    `workspace`,
    `@tests/bud-hash-flag`,
    `run`,
    `bud`,
    `build`,
  ])

  expect(
    await fs.existsAsync(
      path(
        `sources/@roots/bud/test/cli-flag-hash/project/dist/js/main.js`,
      ),
    ),
  ).toBe(`file`)
})
