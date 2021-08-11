import {Framework} from '..'

interface tap<T = Framework> {
  (fn: Framework.Tapable<T>, bound?: boolean): T
}

const tap: tap<Framework> = function (
  fn: Framework.Tapable<Framework>,
  bound: boolean = true,
): Framework {
  fn.call(bound ? this : null, this)

  return this
}

export {tap}
