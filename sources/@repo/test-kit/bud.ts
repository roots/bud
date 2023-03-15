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
  overrides?: Partial<Options.CommandContext>,
  run?: boolean,
): Promise<Bud> => {
  const bud = await makeInstance({
    basedir,
    ...(overrides ?? {}),
    args: {
      dry: true,
      log: false,
      notify: false,
      ...(overrides?.args ?? {}),
    },
  })

  if (!bud.isCLI())
    throw new Error(`test error: bud is not a CLI instance`)

  if (run) await bud.run()

  return bud
}

export {Bud}
export const mockProject = {path: basedir}
