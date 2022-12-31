/* eslint-disable no-console */
import {join} from 'node:path'

import {paths} from '@repo/constants'
import * as fs from '@roots/bud-support/fs'
import {execa} from '@roots/bud-support/execa'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`@roots/bud-criticalcss`, () => {
  describe(`extract`, () => {
    beforeAll(async () => {
      await runFixture(`extract`)
    }, 30000)

    it(`should generate criticalcss`, async () => {
      expect(await readCritical(`extract`)).toMatchSnapshot()
    }, 30000)

    it(`should not emit critical styles in stylesheet`, async () => {
      expect(await readOriginal(`extract`)).toMatchSnapshot()
    }, 30000)
  })

  describe(`no-extract`, () => {
    beforeAll(async () => {
      await runFixture(`no-extract`)
    }, 30000)

    it(`should generate criticalcss`, async () => {
      expect(await readCritical(`no-extract`)).toMatchSnapshot()
    }, 30000)

    it(`should emit critical styles in stylesheet`, async () => {
      expect(await readOriginal(`no-extract`)).toMatchSnapshot()
    }, 30000)
  })
}, 120000)

const baseParts = [
  paths.sources,
  `@roots`,
  `bud-criticalcss`,
  `src`,
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
      `--ci`,
    ],
    {
      reject: false,
      timeout: 30000,
    },
  )

const readOriginal = async target =>
  await fs.readFile(
    join(
      ...baseParts,
      target,
      `dist`,
      `css`,
      `@tests`,
      `bud-criticalcss__${target}.css`,
    ),
    `utf8`,
  )

const readCritical = async target =>
  await fs.readFile(
    join(
      ...baseParts,
      target,
      `dist`,
      `critical`,
      `css`,
      `@tests`,
      `bud-criticalcss__${target}.css`,
    ),
    `utf8`,
  )
