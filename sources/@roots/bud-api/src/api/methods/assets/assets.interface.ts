import type {Framework} from '@roots/bud-framework'

export interface method {
  (from: string[]): Promise<Framework>
}

export interface facade {
  (from: string[]): Framework
}
