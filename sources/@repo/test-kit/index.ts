import type {Bud} from '@roots/bud-framework'
import type * as Options from '@roots/bud-framework/options'

import {path} from '@repo/constants'
import {factory} from '@roots/bud/factory'

const makeTestBud = async (
  overrides: Partial<Options.Context> = {},
): Promise<Bud> => {
  const bud = await factory({
    basedir: overrides.basedir ?? path(`tests`, `util`, `project`),
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
