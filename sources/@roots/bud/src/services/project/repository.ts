import type {Bud} from '@roots/bud-framework'
import type {Context} from '@roots/bud-framework/options'

export interface ConfigItem {
  fileName: string
  filePath: string
  module: (app: Bud) => Promise<unknown> | Record<string, any>
}

export interface ConfigManifest {
  development: Record<string, ConfigItem>
  production: Record<string, ConfigItem>
  base: Record<string, ConfigItem>
}

export interface repository {
  context: Partial<Context>
  config: ConfigManifest
  publicEnv: Record<string, string>
}

/**
 * Project repository
 *
 * @public
 */
export const repository: repository = {
  context: {},
  config: {
    development: {},
    production: {},
    base: {},
  },
  publicEnv: {},
}
