/* eslint-disable no-console */
import {join} from 'node:path'

import {paths} from '@repo/constants'
import * as fs from 'fs-jetpack'
import {execa} from 'execa'
import {describe, expect, it} from 'vitest'

describe(`@roots/bud-criticalcss`, () => {
  it(`extract`, async () => {
    await runFixture(`extract`)
    expect(await readCritical(`extract`)).toMatchSnapshot()
    expect(await readOriginal(`extract`)).toMatchSnapshot()
  }, 60000)

  it(`no-extract`, async () => {
    await runFixture(`no-extract`)
    expect(await readCritical(`no-extract`)).toMatchSnapshot()
    expect(await readOriginal(`no-extract`)).toMatchSnapshot()
  }, 60000)
}, 60000)

const baseParts = [
  paths.sources,
  `@roots`,
  `bud-criticalcss`,
  `test`,
  `__fixtures__`,
]

const runFixture = async target =>
  await execa(
    `yarn`,
    [
      `workspace`,
      `@tests/bud-criticalcss__${target}`,
      `run`,
      `bud`,
      `build`,
      `--no-cache`,
    ],
    {reject: false, timeout: 30000},
  )

const readOriginal = async target =>
  await fs.readAsync(
    join(...baseParts, target, `dist`, `css`, `index.css`),
    `utf8`,
  )

const readCritical = async target =>
  await fs.readAsync(
    join(...baseParts, target, `dist`, `critical`, `css`, `index.css`),
    `utf8`,
  )
