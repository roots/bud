import {Framework} from '..'

interface tap {
  (fn: Framework.Tapable, bound?: boolean): Framework
}

const tap: tap = function (
  fn: Framework.Tapable,
  bound: boolean = true,
): Framework {
  fn.call(bound ? this : null, this)

  return this
}

export {tap}
