import {error} from './tests/util/logger'
process.on('uncaughtException', error)
