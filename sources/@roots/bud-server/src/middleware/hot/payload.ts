import type {StatsCompilation} from '@roots/bud-framework/config'

export interface Payload {
  action: 'building' | 'built' | 'reload' | 'sync'
  errors: StatsCompilation['errors']
  hash: string
  modules: Record<string, Array<number | string>>
  name: StatsCompilation['name']
  time: number
  warnings: StatsCompilation['warnings']
}
