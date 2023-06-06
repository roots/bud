import {path} from '@repo/constants'
import type {Bud} from '@roots/bud'
import {factory} from '@roots/bud/factory'
import type * as Options from '@roots/bud-framework/options'

const basedir = path(`tests`, `util`, `project`)

const makeTestBud = async (
  overrides: Partial<Options.Context> = {},
): Promise<Bud> => {
  const bud = await factory({
    basedir,
    cache: false,
    dry: true,
    force: true,
    mode: `production`,
    notify: false,
    silent: true,
    ...overrides,
  })

  return bud
}

export type {Bud}
export {makeTestBud as factory, makeTestBud}
export const mockProject = {path: basedir}
