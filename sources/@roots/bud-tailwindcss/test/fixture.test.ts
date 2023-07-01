import {join} from 'node:path'
import {paths} from '@repo/constants'
import {execa, ExecaReturnValue} from 'execa'
import {beforeAll, describe, expect, it} from 'vitest'
import fs from 'fs-jetpack'

describe(`@tests/tailwind-integration-test`, () => {
  let child: ExecaReturnValue

  beforeAll(async () => {
    await execa(`yarn`, [
      `bud`,
      `clean`,
      `--cwd`,
      `sources/@roots/bud-tailwindcss/test/fixture`,
    ])

    try {
      child = await execa(`yarn`, [
        `bud`,
        `build`,
        `--no-cache`,
        `--debug`,
        `--cwd`,
        `sources/@roots/bud-tailwindcss/test/fixture`,
      ])
    } catch (error) {}
  }, 30000)

  it(`should generate bg-primary class`, async () => {
    expect(
      await fs.existsAsync(
        join(
          paths.sources,
          `@roots`,
          `bud-tailwindcss`,
          `test`,
          `fixture`,
          `dist`,
          `css`,
          `main.css`,
        ),
      ),
    ).toBe(`file`)
    expect(
      await fs.readAsync(
        join(
          paths.sources,
          `@roots`,
          `bud-tailwindcss`,
          `test`,
          `fixture`,
          `dist`,
          `css`,
          `main.css`,
        ),
      ),
    ).toEqual(expect.stringContaining(`.bg-primary{`))
  })
})
