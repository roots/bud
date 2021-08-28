/* eslint-disable no-console */

import * as sourcemap from 'source-map-support'
sourcemap.install()

import {EventEmitter} from 'events'

EventEmitter.defaultMaxListeners = Infinity

global.console.log = jest.fn()
global.console.info = jest.fn()
global.console.warn = jest.fn()
