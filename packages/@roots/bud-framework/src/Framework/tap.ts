import {Framework} from '..'

interface tap {
  (
    this: Framework,
    fn: Framework.Tapable,
    bound?: boolean,
  ): Framework
}

function tap(
  this: Framework,
  fn: Framework.Tapable,
  bound: boolean = true,
) {
  fn.call(bound ? this : null, this)

  return this
}

export {tap}
