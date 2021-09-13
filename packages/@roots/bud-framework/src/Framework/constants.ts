/**
 * Service lifecycle events
 *
 * @public
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
 * Services which are only instantiated in the parent compiler context.
 *
 * @public
 */
const PARENT_SERVICES: (string | number)[] = [
  'compiler',
  'dashboard',
  'project',
  'server',
]

/**
 * Services which are only instantiated in development
 *
 * @public
 */
const DEVELOPMENT_SERVICES: (string | number)[] = ['server']

export {DEVELOPMENT_SERVICES, LIFECYCLE_EVENTS, PARENT_SERVICES}
