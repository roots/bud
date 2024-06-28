/* eslint-disable n/no-process-env */
import {sep} from 'node:path'

import {path} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {Filesystem} from '@roots/bud-support/filesystem'
import axios from 'axios'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`issue-2574`, () => {
  let fs: Filesystem
  let head: string

  beforeAll(async () => {
    fs = new Filesystem()

    head = (await fs.read(path(`.git`, `HEAD`)))
      .toString()
      .split(sep)
      .pop()
      .trim()

    await execa(`yarn`, [`bud`, `clean`], {
      cwd: path(`tests`, `reproductions`, `issue-2574`),
    })

    await execa(`yarn`, [`bud`, `build`, `--force`, `--no-cache`], {
      cwd: path(`tests`, `reproductions`, `issue-2574`),
    })
  }, 30000)

  it(`should upload to s3`, async () => {
    const result = await axios.get(
      `https://bud-js-tests.s3.us-west-2.amazonaws.com/${head}/js/main.js`,
    )
    expect(result.data).toBe(
      await fs.read(
        path(
          `tests`,
          `reproductions`,
          `issue-2574`,
          `dist`,
          `js`,
          `main.js`,
        ),
      ),
    )
  })
}, 120000)
