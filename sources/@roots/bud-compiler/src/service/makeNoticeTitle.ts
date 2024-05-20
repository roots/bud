import type {Bud} from '@roots/bud-framework'
import type {StatsCompilation} from '@roots/bud-framework/config'

export const makeNoticeTitle = (bud: Bud, child: StatsCompilation) =>
  bud.label !== child.name ? `${bud.label} (${child.name})` : child.name
