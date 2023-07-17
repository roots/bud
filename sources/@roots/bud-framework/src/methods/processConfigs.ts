import type {Bud} from '@roots/bud-framework'

import * as configuration from '@roots/bud-framework/configuration'

/**
 * Process user configurations
 */
export interface processConfigs {
  (): Promise<Bud>
}

export const processConfigs: processConfigs = async function () {
  await configuration.process(this)
  return this
}
