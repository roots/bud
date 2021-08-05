import {Framework} from '..'

interface Callback {
  <T>(value: T): any
}

interface sequence {
  <T = Framework>(
    this: Framework,
    fns: Callback[],
    value?: T,
  ): Framework
}

function sequence<T = Framework>(
  this: Framework,
  fns: Callback[],
  value?: T,
): Framework {
  value ? fns.map(fn => fn(value)) : fns.map(fn => fn(this))

  return this
}

export {sequence}
