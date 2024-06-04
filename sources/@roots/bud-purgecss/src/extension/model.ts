import type {UserDefinedOptions as Options} from '@fullhuman/postcss-purgecss'

import {type ExtensionApi} from '@roots/bud-framework/extension'

export interface BudPurgeCSSPublicInterface
  extends ExtensionApi<BudPurgeCSSPublicInterface, Options> {}
