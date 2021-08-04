const LIFECYCLE_EVENTS = [
  'bootstrap',
  'bootstrapped',
  'register',
  'registered',
  'boot',
  'booted',
]

const PARENT_SERVICES: (string | number)[] = [
  'compiler',
  'dashboard',
  'discovery',
  'server',
]

export {LIFECYCLE_EVENTS, PARENT_SERVICES}
