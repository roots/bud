import {paths} from '@repo/constants'
import Bud from '@roots/bud'
import {factory as makeInstance} from '@roots/bud/factory'
import type {Config} from '@roots/bud-framework'
import {join} from 'node:path'

export const repoPath = (...path: Array<string>) =>
  join(paths.root, ...(path ?? []))

export const mockProject = {
  path: repoPath(`tests`, `util`, `project`),
}

export const factory = async (
  overrides?: Partial<Config.Context>,
): Promise<Bud> => {
  process.env.BUD_TEST_ENV = `true`

  const bud = await makeInstance({
    basedir: mockProject.path,
    mode: `production`,
    ...(overrides ?? {}),
  })

  return bud
}

export {Bud}
