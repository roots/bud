import type {Bud, Bundle} from './types'

const bundle: Bundle = function (
  this: Bud,
  name: string,
  entries: string[],
): Bud {
  this.options.merge('entry', {[`${name}`]: entries})

  return this
}

export {bundle}
