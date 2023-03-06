import type {Bud} from '../bud.js'

interface Callback {
  (value?: Bud): Promise<unknown>
}

export interface sequence<T = Bud> {
  (fns: Array<Callback>): Promise<Bud>
}

/**
 * Run a value through an array of asyncronous, non-mutational functions.
 *
 * @remarks
 * Unlike {@link pipe} the value returned from each function is ignored.
 */
export const sequence = async function (
  fns: Array<Callback>,
): Promise<Bud> {
  const app = this as Bud

  await fns.reduce(async (promised, fn) => {
    await promised
    await fn(app)
  }, Promise.resolve())

  return app
}

interface SyncCallback {
  (value: unknown): unknown
}

export interface sequenceSync {
  (fns: Array<SyncCallback>): Bud
}

/**
 * Run a value through an array of syncronous, non-mutational functions.
 *
 * @remarks
 * Unlike {@link pipe} the value returned from each function is ignored.
 */
export const sequenceSync: sequenceSync = (
  fns: Array<SyncCallback>,
): Bud => {
  const app = this as Bud

  fns.map(fn => fn.call(this, app))

  return app
}
