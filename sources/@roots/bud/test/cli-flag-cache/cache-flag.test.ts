import {path} from '@repo/constants'
import {execa} from 'execa'
import {beforeEach, describe, expect, it} from 'vitest'

const projectDir = path(
  `sources`,
  `@roots`,
  `bud`,
  `test`,
  `cli-flag-cache`,
  `__fixtures__`,
)

describe.sequential(`--cache`, async () => {
  beforeEach(async () => {
    await execa(`yarn`, [`bud`, `clean`, `storage`], {cwd: projectDir})
  })

  it(`should generate cache by default`, async () => {
    await execa(`yarn`, [`bud`, `build`], {cwd: projectDir})
    const {stdout} = await execa(`yarn`, [`bud`, `build`], {
      cwd: projectDir,
    })

    expect(stdout).toMatch(/4\/4 modules cached/)
  })

  it(`should not generate cache when --no-cache is passed`, async () => {
    const {stdout} = await execa(`yarn`, [`bud`, `build`, `--no-cache`], {
      cwd: projectDir,
    })
    expect(stdout).toMatch(/0\/4 modules cached/)
  })
})
