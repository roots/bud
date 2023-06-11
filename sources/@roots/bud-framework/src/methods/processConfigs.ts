import * as configuration from '../configuration/index.js'
import type {Bud} from '../index.js'

/**
 * Process user configurations
 */
export interface processConfigs {
  (): Promise<Bud>
}

export const processConfigs: processConfigs = async function () {
  const app = this as Bud
  await configuration.process(app)
  return app
}
