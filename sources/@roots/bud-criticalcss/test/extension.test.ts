/* eslint-disable no-console */
import {join} from 'node:path'

import {paths} from '@repo/constants'
// @ts-ignore
import fs from '@roots/bud-support/fs-jetpack'
import {execa} from '@roots/bud-support/execa'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`@roots/bud-criticalcss`, () => {
  beforeAll(async () => {
    try {
      await runFixture(`extract`)
      await runFixture(`no-extract`)
    } catch (e) {
    }
  }, 60000)

  it(`should generate criticalcss`, async () => {
    expect(await readCritical(`extract`)).toMatchInlineSnapshot('"body{background-color:#00f}.foo{background-color:#000}"')
  }, 60000)

  it(`should not emit critical styles in stylesheet`, async () => {
    expect(await readOriginal(`extract`)).toMatchInlineSnapshot('".ignore-style .test{background-color:red}"')
  }, 60000)

  it(`should generate criticalcss`, async () => {
    expect(await readCritical(`no-extract`)).toMatchInlineSnapshot('".big{background-color:#00f;height:500vh;width:100vw}"')
  }, 60000)

  it(`should emit critical styles in stylesheet`, async () => {
    expect(await readOriginal(`no-extract`)).toMatchInlineSnapshot('".big{background-color:blue;height:500vh;width:100vw}.uncritical{background-color:#000}"')
  }, 60000)
}, 180000)

const baseParts = [
  paths.sources,
  `@roots`,
  `bud-criticalcss`,
  `test`,
  `__fixtures__`,
]

export async function runFixture(target: string) {
  return await execa(
    `yarn`,
    [
      `workspace`,
      `@tests/bud-criticalcss__${target}`,
      `run`,
      `bud`,
      `build`,
      `--force`,
    ],
    {
      reject: false,
      timeout: 30000,
    },
  )
}

const readOriginal = async (target: string) => {
  return await fs.read(
    join(
      ...baseParts,
      target,
      `dist`,
      `css`,
      `@tests`,
      `bud-criticalcss__${target}.css`,
    ),
  )
}

const readCritical = async (target: string) => {
  return await fs.read(
    join(
      ...baseParts,
      target,
      `dist`,
      `critical`,
      `css`,
      `@tests`,
      `bud-criticalcss__${target}.css`,
    ),
  )
}
