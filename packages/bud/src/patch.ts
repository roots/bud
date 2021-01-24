import events from 'events'
import {lodash as _} from '@roots/bud-support'

/**
 * This "fixes" resize emitter warnings
 * @todo actually fix this
 */
events.EventEmitter.defaultMaxListeners = 20

/**
 * This fixes issues with SWR thinking its in the browser.
 * @todo does this fix the vue extension issue?
 */
Object.assign(global, {navigator: undefined})
