import {Framework} from '@roots/bud-framework'
export {Framework}

import * as Webpack from 'webpack'
export {Webpack}

export type InjectClient = (
  app: Framework,
  injection: string[],
) => Promise<void>
