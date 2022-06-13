import type {Bud} from '@roots/bud-framework'

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
  version: string
  config: ConfigManifest
  manifest: Record<string, any>
  installed: Record<string, string>
}

/**
 * Project repository
 *
 * @public
 */
export const repository: repository = {
  version: null,
  config: {
    development: {},
    production: {},
    base: {},
  },
  manifest: {},
  installed: {},
}
