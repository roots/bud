import type {Framework} from './'
interface close {
  (this: Framework, done?: CallableFunction): void
}
declare function close(
  this: Framework,
  done?: (code?: number) => never,
): void
export {close}
//# sourceMappingURL=close.d.ts.map
