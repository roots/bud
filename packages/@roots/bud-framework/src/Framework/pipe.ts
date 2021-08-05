import {Framework} from '..'

interface Callback<T = Framework> {
  (input: T): T
}

interface pipe {
  <T = Framework>(fns: Callback<T>[], value?: T): T
}

function pipe<T = Framework>(fns: Callback<T>[], value?: T): T {
  const pipeReducer = (val: T, fn: Callback<T>) => {
    return fn(val)
  }

  return value
    ? fns.reduce(pipeReducer, value)
    : fns.reduce(pipeReducer, this)
}

export {pipe}
