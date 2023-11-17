import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {expect, test} from 'vitest'

test(`--minimize`, async () => {
  await fs.removeAsync(
    path(`sources/@roots/bud/test/cli-flag-minimize/project/dist`),
  )

  await execa(`yarn`, [
    `workspace`,
    `@tests/minimize-flag`,
    `run`,
    `bud`,
    `build`,
    `--no-minimize`,
  ])

  expect(
    await fs.readAsync(
      path(
        `sources/@roots/bud/test/cli-flag-minimize/project/dist/js/main.js`,
      ),
    ),
  ).toMatch(/\n/)

  await fs.removeAsync(
    path(`sources/@roots/bud/test/cli-flag-minimize/project/dist`),
  )

  await execa(`yarn`, [
    `workspace`,
    `@tests/minimize-flag`,
    `run`,
    `bud`,
    `build`,
    `--minimize`,
  ])

  expect(
    await fs.readAsync(
      path(
        `sources/@roots/bud/test/cli-flag-minimize/project/dist/js/main.js`,
      ),
    ),
  ).not.toMatch(/\n/)
})
