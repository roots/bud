import {isFunction} from 'lodash'

import {Framework} from '..'

interface Callback {
  (value?: Framework): Promise<unknown>
}

export interface sequence<T = Framework> {
  (fns: Array<Callback>): Promise<Framework>
}

export const sequence = async function (
  fns: Array<Callback>,
): Promise<Framework> {
  const app = this as Framework

  await fns.reduce(async (next, fn) => {
    const current = await next
    await fn.call(this, app)
    return current
  }, Promise.resolve())

  return app
}

interface SyncCallback {
  (value: unknown): unknown
}

export interface sequenceSync {
  <T>(fns: Array<SyncCallback>): Framework
}

export const sequenceSync: sequenceSync = (
  fns: Array<SyncCallback>,
): Framework => {
  const app = this as Framework

  fns.map(fn => (isFunction(fn) ? app.tap(fn) : fn))

  return app
}
