/**
 * CLI app
 */
export {CLI} from './CLI'

/**
 * CLI commands
 */
export * as commands from './CLI/commands'

/**
 * Bootstrap utils
 */
export {
  isStatic,
  isFluent,
  preflight,
  json,
  api,
} from './CLI/commands/build/source'
