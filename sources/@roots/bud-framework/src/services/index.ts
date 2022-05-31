import {Service} from '../service.js'

export * as Api from './api/index.js'
export * as Build from './build/index.js'
export * as Cache from './cache/index.js'
export * as Dashboard from './dashboard/index.js'
export * as Env from './env/index.js'
export * as Extensions from './extensions/index.js'
export * as Hooks from './hooks/index.js'
export * as Peers from './peers/index.js'
export * as Project from './project/index.js'
export * as Server from './server/index.js'

/**
 * Registered services
 *
 * @virtual @public
 */
export interface Registry extends Partial<Record<string, Service>> {}
