import {Framework} from '..'

interface pipe {
  (
    fns: ((input: Framework) => Framework)[],
    value?: Framework,
  ): Framework
}

function pipe(
  fns: ((input: Framework) => Framework)[],
  value?: Framework,
): Framework {
  const pipeReducer = (
    val: Framework,
    fn: (input: Framework) => Framework,
  ) => {
    return fn(val)
  }

  return fns.reduce(pipeReducer, value ?? this)
}

export {pipe}
