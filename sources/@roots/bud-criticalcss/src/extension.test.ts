/* eslint-disable no-console */
import {paths} from '@repo/constants/.'
import * as fs from '@roots/bud-support/fs'
import {execa} from 'execa'
import {join} from 'path'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`@roots/bud-criticalcss`, () => {
  describe(`extract`, () => {
    beforeEach(async () => {
      await runFixture(`extract`)
    })

    it(`should generate criticalcss`, async () => {
      expect(await readCritical(`extract`)).toMatchSnapshot()
    })

    it(`should not emit critical styles in stylesheet`, async () => {
      expect(await readOriginal(`extract`)).toMatchSnapshot()
    })
  })

  describe(`no-extract`, () => {
    beforeEach(async () => {
      await runFixture(`no-extract`)
    })

    it(`should generate criticalcss`, async () => {
      expect(await readCritical(`no-extract`)).toMatchSnapshot()
    })

    it(`should emit critical styles in stylesheet`, async () => {
      expect(await readOriginal(`no-extract`)).toMatchSnapshot()
    })
  })
}, 120000)

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
      paths.sources,
      `@roots`,
      `bud-criticalcss`,
      `src`,
      `__fixtures__`,
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
      paths.sources,
      `@roots`,
      `bud-criticalcss`,
      `src`,
      `__fixtures__`,
      target,
      `dist`,
      `critical`,
      `css`,
      `@tests`,
      `bud-criticalcss__${target}.css`,
    ),
    `utf8`,
  )
