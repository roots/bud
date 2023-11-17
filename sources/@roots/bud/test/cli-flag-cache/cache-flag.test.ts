import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {expect, test} from 'vitest'

const cachePath = path(
  `sources/@roots/bud/test/cli-flag-cache/project/.storage/@tests/flag-cache/cache`,
)

test(`--cache`, async () => {
  await fs.removeAsync(cachePath)

  await execa(`yarn`, [
    `workspace`,
    `@tests/flag-cache`,
    `run`,
    `bud`,
    `build`,
  ])

  expect(await fs.existsAsync(cachePath)).toBe(`dir`)

  await fs.removeAsync(cachePath)

  await execa(`yarn`, [
    `workspace`,
    `@tests/flag-cache`,
    `run`,
    `bud`,
    `build`,
    `--no-cache`,
  ])

  expect(await fs.existsAsync(cachePath)).toBe(false)
})
