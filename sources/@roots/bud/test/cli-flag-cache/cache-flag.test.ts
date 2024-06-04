import {path} from '@repo/constants'
import {execa} from 'execa'
import {beforeEach, describe, expect, it} from 'vitest'

const opts = {
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
  reject: false,
}

describe(`--cache`, async () => {
  beforeEach(async () => {
    await execa(`yarn`, [`bud`, `clean`, `storage`], opts)
  })

  it(`should generate cache by default`, async () => {
    await execa(`yarn`, [`bud`, `build`], opts)
    const {stdout} = await execa(`yarn`, [`bud`, `build`, `--log`], opts)
    expect(stdout).toMatch(/4\/4 modules cached/)
    expect(stdout).toMatch(/Cache: filesystem/)
  })

  it(`should not generate cache when --no-cache is passed`, async () => {
    const {stdout} = await execa(
      `yarn`,
      [`bud`, `build`, `--no-cache`, `--log`],
      opts,
    )
    expect(stdout).toMatch(/0\/4 modules cached/)
    expect(stdout).toMatch(/Cache: disabled/)
  })

  it(`should not generate cache when --cache=false is passed`, async () => {
    const {stdout} = await execa(
      `yarn`,
      [`bud`, `build`, `--cache=false`, `--log`],
      opts,
    )
    expect(stdout).toMatch(/0\/4 modules cached/)
    expect(stdout).toMatch(/Cache: disabled/)
  })

  it(`should use memory cache when --cache=memory is passed`, async () => {
    const {stdout} = await execa(
      `yarn`,
      [`bud`, `build`, `--cache=memory`, `--log`],
      opts,
    )
    expect(stdout).toMatch(/Cache: memory/)
  })
})
