import {path} from '@repo/constants'
import {execa} from 'execa'
import {beforeEach, describe, expect, it} from 'vitest'

const childOptions = {
  cwd: path(
    `sources`,
    `@roots`,
    `bud`,
    `test`,
    `cli-flag-cache`,
    `__fixtures__`,
  ),
  env: {CI: `false`},
  extendEnv: true,
}

describe.sequential(`--cache`, async () => {
  beforeEach(async () => {
    await execa(`yarn`, [`bud`, `clean`, `storage`], childOptions)
  })

  it(`should generate cache by default`, async () => {
    await execa(`yarn`, [`bud`, `build`], childOptions)
    const {stdout} = await execa(`yarn`, [`bud`, `build`], childOptions)
    expect(stdout).toMatch(/4\/4 modules cached/)
  })

  it(`should not generate cache when --no-cache is passed`, async () => {
    const {stdout} = await execa(
      `yarn`,
      [`bud`, `build`, `--no-cache`],
      childOptions,
    )
    expect(stdout).toMatch(/0\/4 modules cached/)
  })
})
