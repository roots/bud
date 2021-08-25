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
declare function sequence<T = Framework>(
  this: Framework,
  fns: Callback[],
  value?: T,
): Framework
export {sequence}
//# sourceMappingURL=sequence.d.ts.map
