import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {expect, test} from 'vitest'

test(`--runtime`, async () => {
  await fs.removeAsync(
    path(`sources/@roots/bud/test/cli-flag-runtime/project/dist`),
  )

  await execa(`yarn`, [
    `workspace`,
    `@tests/bud-runtime-flag`,
    `run`,
    `bud`,
    `build`,
  ])

  expect(
    await fs.existsAsync(
      path(
        `sources/@roots/bud/test/cli-flag-runtime/project/dist/js/runtime.js`,
      ),
    ),
  ).toBe(`file`)

  await fs.removeAsync(
    path(`sources/@roots/bud/test/cli-flag-runtime/project/dist`),
  )

  await execa(`yarn`, [
    `workspace`,
    `@tests/bud-runtime-flag`,
    `run`,
    `bud`,
    `build`,
    `--runtime`,
  ])

  expect(
    await fs.existsAsync(
      path(
        `sources/@roots/bud/test/cli-flag-runtime/project/dist/js/runtime.js`,
      ),
    ),
  ).toBe(`file`)

  await execa(`yarn`, [
    `workspace`,
    `@tests/bud-runtime-flag`,
    `run`,
    `bud`,
    `build`,
    `--no-runtime`,
  ])

  expect(
    await fs.existsAsync(
      path(
        `sources/@roots/bud/test/cli-flag-runtime/project/dist/js/runtime.js`,
      ),
    ),
  ).toBe(false)
})
