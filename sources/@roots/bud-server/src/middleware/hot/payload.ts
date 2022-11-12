import type {StatsCompilation} from '@roots/bud-support/webpack'

export interface Payload {
  name: StatsCompilation['name']
  action: 'building' | 'built' | 'sync' | 'reload'
  time: number
  hash: string
  warnings: StatsCompilation['warnings']
  errors: StatsCompilation['errors']
  modules: Record<string, Array<string | number>>
}
