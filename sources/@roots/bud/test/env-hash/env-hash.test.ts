import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {expect, test} from 'vitest'

test(`env.hash`, async () => {
  await fs.removeAsync(
    path(`sources/@roots/bud/test/env-hash/project/dist`),
  )

  await execa(`yarn`, [
    `workspace`,
    `@tests/env-hash`,
    `run`,
    `bud`,
    `build`,
  ])

  expect(
    await fs.existsAsync(
      path(`sources/@roots/bud/test/env-hash/project/dist/js/main.js`),
    ),
  ).toBe(false)
})
