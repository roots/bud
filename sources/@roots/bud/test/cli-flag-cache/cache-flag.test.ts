import {existsSync as exists, rmSync as remove} from 'node:fs'

import {path} from '@repo/constants'
import {execaSync as $} from 'execa'
import {afterAll, beforeEach, describe, expect, it} from 'vitest'

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

describe(`--cache`, async () => {
  afterAll(() => {
    $(`yarn`, [`bud`, `--cwd`, projectDir, `build`])
  })

  beforeEach(() => {
    exists(cacheDir) && remove(cacheDir, {recursive: true})
  })

  it(`should generate cache by default`, async () => {
    $(`yarn`, [`bud`, `--cwd`, projectDir, `build`])

    expect(exists(cacheDir)).toBe(true)
  })

  it(`should not generate cache when --no-cache is passed`, async () => {
    const {stderr, stdout} = $(`yarn`, [
      `bud`,
      `--cwd`,
      projectDir,
      `build`,
      `--no-cache`,
    ])

    expect(stderr).toMatchSnapshot()
    expect(stdout.split(`\n`).slice(2, -3).join(`\n`)).toMatchSnapshot()
    expect(exists(cacheDir)).toBe(false)
  })
})
