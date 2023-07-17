import type {Bud} from '@roots/bud-framework'

import {after} from '@roots/bud-framework/methods/after'
import {bindFacade} from '@roots/bud-framework/methods/bindFacade'
import {close} from '@roots/bud-framework/methods/close'
import {container} from '@roots/bud-framework/methods/container'
import {get} from '@roots/bud-framework/methods/get'
import {glob, globSync} from '@roots/bud-framework/methods/glob'
import {maybeCall} from '@roots/bud-framework/methods/maybeCall'
import {path} from '@roots/bud-framework/methods/path'
import {pipe} from '@roots/bud-framework/methods/pipe'
import {processConfigs} from '@roots/bud-framework/methods/processConfigs'
import {publicPath} from '@roots/bud-framework/methods/publicPath'
import {relPath} from '@roots/bud-framework/methods/relPath'
import {run} from '@roots/bud-framework/methods/run'
import {
  sequence,
  sequenceSync,
} from '@roots/bud-framework/methods/sequence'
import {setPath} from '@roots/bud-framework/methods/setPath'
import {setPublicPath} from '@roots/bud-framework/methods/setPublicPath'
import {sh} from '@roots/bud-framework/methods/sh'
import {tap, tapAsync} from '@roots/bud-framework/methods/tap'
import {when} from '@roots/bud-framework/methods/when'

type methods = Partial<{
  [K in keyof Bud as `${K & string}`]: Bud[K]
}>

const methods = {
  after,
  bindFacade,
  close,
  container,
  get,
  glob,
  globSync,
  maybeCall,
  path,
  pipe,
  processConfigs,
  publicPath,
  relPath,
  run,
  sequence,
  sequenceSync,
  setPath,
  setPublicPath,
  sh,
  tap,
  tapAsync,
  when,
}

export default methods
