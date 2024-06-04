import type {Bud, Context} from '@roots/bud-framework'

import {path} from '@repo/constants'
import {factory} from '@roots/bud'

export type Options = {
  extensions?: Array<string>
} & Omit<Partial<Context>, `extensions`>

const makeTestBud = async (options: Options = {}): Promise<Bud> =>
  await factory({
    basedir: options.basedir ?? path(`tests`, `util`, `project`),
    cache: false,
    dry: true,
    force: true,
    mode: `production`,
    notify: false,
    silent: true,
    ...options,
  })

export type {Bud}
export {makeTestBud as factory, makeTestBud}
