import {Framework} from '..'

interface Callback {
  <T>(value: T): any
}

export interface sequence {
  <T = Framework>(fns: Callback[], value?: T): Framework
}

export function sequence<T = Framework>(
  fns: Callback[],
  value?: T,
): Framework {
  const ctx = this as Framework
  value ? fns.map(fn => fn(value)) : fns.map(fn => fn(ctx))

  return ctx
}
