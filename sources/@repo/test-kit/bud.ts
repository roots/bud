/* eslint-disable n/no-process-env */
import '@roots/bud'

import {join} from 'node:path'

import {paths} from '@repo/constants'
import type {Bud as BaseBud} from '@roots/bud'
import {factory as makeInstance} from '@roots/bud/factory'
import type * as Options from '@roots/bud-framework/options'

type Bud = BaseBud & {context: Options.CommandContext}

export const repoPath = (...path: Array<string>) =>
  join(paths.root, ...(path ?? []))

export const basedir = repoPath(`tests`, `util`, `project`)

export const factory = async (
  overrides: Partial<Options.CommandContext> = {},
  run = false,
): Promise<Bud & {context: Options.CommandContext}> => {
  const bud = await makeInstance(
    {
      basedir,
      ...(overrides ?? {}),
      args: {
        dry: true,
        log: false,
        notify: false,
        ...(overrides?.args ?? {}),
      },
    },
    {cache: false, find: true},
  )

  if (!bud.isCLI())
    throw new Error(`test error: bud is not a CLI instance`)

  if (run) await bud.run()

  return bud
}

export {Bud}
export const mockProject = {path: basedir}
