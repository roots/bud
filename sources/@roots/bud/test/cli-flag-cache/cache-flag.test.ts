import {existsSync as exists, rmSync as remove} from 'node:fs'

import {path} from '@repo/constants'
import {execaSync as $} from 'execa'
import {beforeEach, describe, expect, it} from 'vitest'

const projectDir = path(
  `sources`,
  `@roots`,
  `bud`,
  `test`,
  `cli-flag-cache`,
  `project`,
)

describe(`--cache`, async () => {
  beforeEach(() => {
    $(`yarn`, [`bud`, `--cwd`, projectDir, `clean`, `storage`])
  })

  it(`should generate cache by default`, async () => {
    $(`yarn`, [`bud`, `--cwd`, projectDir, `build`])
    const {stdout} = $(`yarn`, [`bud`, `--cwd`, projectDir, `build`])
    expect(stdout).toMatch(/4\/4 modules cached/)
  })

  it(`should not generate cache when --no-cache is passed`, async () => {
    const {stderr, stdout} = $(`yarn`, [
      `bud`,
      `--cwd`,
      projectDir,
      `build`,
      `--no-cache`,
    ])
    expect(stderr).toEqual(``)
    expect(stdout).toMatch(/0\/4 modules cached/)
  })
})
