/* eslint-disable no-console */
import type * as Options from '@roots/bud-framework/options'
import {resolve} from 'node:path'

import Context from './context.js'

/**
 * Context factory
 *
 * @remarks
 * @see {@link https://mael.dev/clipanion/docs/contexts}
 *
 * @param basedir - project directory
 * @returns {@link Context}
 *
 * @public
 */
export const get = async (basedir: string): Promise<Options.Context> => {
  basedir = resolve(process.cwd(), basedir)
  return await Context.make(basedir)
}
