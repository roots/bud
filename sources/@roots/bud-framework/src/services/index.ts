import {Service} from '../service'

export * as Api from './api'
export * as Build from './build'
export * as Cache from './cache'
export * as Dashboard from './dashboard'
export * as Env from './env'
export * as Extensions from './extensions'
export * as Hooks from './hooks'
export * as Peers from './peers'
export * as Project from './project'
export * as Server from './server'

/**
 * Registered services
 *
 * @virtual @public
 */
export interface Registry
  extends Partial<Record<string, Service>> {}
