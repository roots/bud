/* eslint-disable n/no-process-env */
import '@roots/bud'

import {join} from 'node:path'

import {paths} from '@repo/constants'
import {Bud} from '@roots/bud'
import {factory as makeInstance} from '@roots/bud/factory'
import type * as Options from '@roots/bud-framework/options'

export const repoPath = (...path: Array<string>) =>
  join(paths.root, ...(path ?? []))

export const basedir = repoPath(`tests`, `util`, `project`)

export const factory = async (
  overrides?: Partial<Options.Context>,
  skipConfig = true,
): Promise<Bud> => {
  const bud = await makeInstance(
    {
      basedir,
      ...(overrides ?? {}),
      args: {
        dry: true,
        log: false,
        ...(overrides?.args ?? {}),
      },
    },
    false,
  )

  if (!skipConfig) await bud.run()

  return bud
}

export {Bud}
export const mockProject = {path: basedir}
