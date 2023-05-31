/* eslint-disable n/no-process-env */
import '@roots/bud'

import {join} from 'node:path'

import {paths} from '@repo/constants'
import {factory as makeInstance} from '@roots/bud/factory'
import type {Bud} from '@roots/bud-framework'
import type * as Options from '@roots/bud-framework/options'

export const repoPath = (...path: Array<string>) =>
  join(paths.root, ...(path ?? []))

export const basedir = repoPath(`tests`, `util`, `project`)

export const factory = async (
  overrides: Partial<Options.Context> = {},
): Promise<Bud> => {
  const bud = await makeInstance({
    basedir,
    cache: false,
    force: true,
    dry: true,
    silent: true,
    notify: false,
    mode: `production`,
    ...overrides,
  })

  await bud.run()

  return bud
}

export type {Bud}
export const mockProject = {path: basedir}
