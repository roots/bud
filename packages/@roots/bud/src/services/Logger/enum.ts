/**
 * @module Bud.Logger
 */

/**
 * Instance configuration
 */
const INSTANCE_CONFIG = {
  displayScope: true,
  displayBadge: true,
  displayDate: false,
  displayFilename: false,
  displayLabel: false,
  displayTimestamp: false,
  underlineLabel: false,
  underlineMessage: false,
  underlinePrefix: false,
  underlineSuffix: false,
  uppercaseLabel: false,
}

/**
 * Logger types
 */
const LOGGER_TYPES = {
  log: {
    label: 'log',
    badge: '≫',
    color: 'magentaBright',
  },
}

export {INSTANCE_CONFIG, LOGGER_TYPES}
