/**
 * Service lifecycle events
 */
const LIFECYCLE_EVENTS = [
  'bootstrap',
  'bootstrapped',
  'register',
  'registered',
  'boot',
  'booted',
]

/**
 * Services which should only be instantiated in the parent compiler context.
 */
const PARENT_SERVICES: (string | number)[] = [
  'compiler',
  'dashboard',
  'discovery',
  'server',
]

/**
 * Services which should only be instantiated in development
 */
const DEVELOPMENT_SERVICES: (string | number)[] = ['server']

export {DEVELOPMENT_SERVICES, LIFECYCLE_EVENTS, PARENT_SERVICES}
