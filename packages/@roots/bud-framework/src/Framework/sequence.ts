import {Framework} from '..'

interface sequence {
  (
    this: Framework,
    fns: Array<(app: Framework) => any>,
  ): Framework
}

function sequence(
  this: Framework,
  fns: Array<(app: Framework) => any>,
): Framework {
  fns.reduce((_val, fn) => this.tap(fn), this)

  return this
}

export {sequence}
