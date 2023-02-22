import type {Bud} from '../bud.js'

interface Callback {
  (value?: Bud): Promise<unknown>
}

export interface sequence {
  (fns: Array<Callback>): Promise<Bud>
}

/**
 * Run a value through an array of asyncronous, non-mutational functions.
 *
 * @remarks
 * Unlike {@link pipe} the value returned from each function is ignored.
 */
export async function sequence(fns: Array<Callback>): Promise<Bud> {
  const app = this as Bud

  await fns.reduce(async (_promised, fn) => {
    await fn(app)
    return Promise.resolve()
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
export function sequenceSync(fns: Array<SyncCallback>): Bud {
  const app = this as Bud

  fns.map(fn => fn.call(this, app))

  return app
}
