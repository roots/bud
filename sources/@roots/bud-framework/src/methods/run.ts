import {noop} from '@roots/bud-support/lodash-es'

import type {Bud} from '../bud.js'

/**
 * Run the build
 *
 * @public
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud): Promise<void> {
  if (this.isProduction) {
    return await this.compiler
      .compile()
      .then(compilation => compilation?.run(noop))
  }

  await this.server.run()
}
