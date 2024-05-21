import {existsSync as exists, rmSync as remove} from 'node:fs'

import {path} from '@repo/constants'
import {execaSync as $} from 'execa'
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

const removeCache = () =>
  exists(cacheDir) && remove(cacheDir, {recursive: true})

test(`--cache`, async () => {
  removeCache()

  $(`yarn`, [`bud`, `--cwd`, projectDir, `build`])

  expect(exists(cacheDir)).toBe(true)

  removeCache()

  $(`yarn`, [`bud`, `--cwd`, projectDir, `build`, `--no-cache`])

  expect(exists(cacheDir)).toBe(false)
})
