import {jest} from '@jest/globals'
import {paths} from '@repo/constants'
import Bud from '@roots/bud'
import {factory as makeInstance} from '@roots/bud/factory'
import type {Config} from '@roots/bud-framework'
import {join} from 'node:path'

jest.mock(`@roots/bud-compiler`)

export const repoPath = (...path: Array<string>) =>
  join(paths.root, ...(path ?? []))

export const mockProject = {
  path: repoPath(`tests`, `util`, `project`),
}

export const factory = async (
  overrides?: Partial<Config.Context>,
  useConfig = false,
): Promise<Bud> => {
  process.env.BUD_TEST_ENV = `true`

  const bud = await makeInstance(
    {
      basedir: mockProject.path,
      ...(overrides ?? {}),
      args: {
        dry: true,
        log: false,
        ...(overrides?.args ?? {}),
      },
    },
    true,
    !useConfig,
  )

  return bud
}

export {Bud}
