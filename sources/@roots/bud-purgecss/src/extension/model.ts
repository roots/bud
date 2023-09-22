import type { UserDefinedOptions as Options } from '@fullhuman/postcss-purgecss'

import {type StrictPublicExtensionApi} from '@roots/bud-framework/extension'

export interface BudPurgeCSSPublicInterface
  extends StrictPublicExtensionApi<
    BudPurgeCSSPublicInterface,
    Options
  > {}
