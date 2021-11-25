import type * as Framework from '@roots/bud-framework'
import type {TailwindConfig as Config} from 'tailwindcss/tailwind-config'

export type {Config}

export type Extension = Framework.Extension.Module

export interface ConfigFn {
  (config?: Config): Framework.Framework
}
