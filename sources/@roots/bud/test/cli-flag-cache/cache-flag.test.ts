import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {expect, test} from 'vitest'

const projectDir = path(
  `sources`,
  `@roots`,
  `bud`,
  `test`,
  `cli-flag-cache`,
  `project`,
)
const cacheDir = path(
  `sources`,
  `@roots`,
  `bud`,
  `test`,
  `cli-flag-cache`,
  `project`,
  `.storage`,
  `@tests`,
  `flag-cache`,
  `cache`,
)

const removeCache = async () =>
  (await fs.existsAsync(cacheDir)) && (await fs.removeAsync(cacheDir))

test(`--cache`, async () => {
  await removeCache()

  await execa(`yarn`, [`bud`, `--cwd`, projectDir, `build`])

  expect(await fs.existsAsync(cacheDir)).toBe(`dir`)

  await removeCache()

  await execa(`yarn`, [`bud`, `--cwd`, projectDir, `build`, `--no-cache`])

  expect(await fs.existsAsync(cacheDir)).toBe(false)
})
