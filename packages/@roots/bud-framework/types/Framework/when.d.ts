import type {Framework} from './'
interface when {
  (
    this: Framework,
    test: ((app: Framework) => boolean) | boolean,
    trueCase: (app: Framework) => any,
    falseCase?: (app: Framework) => any,
  ): Framework
}
declare function when(
  this: Framework,
  test: ((app: Framework) => boolean) | boolean,
  trueCase: (app: Framework) => any,
  falseCase?: (app: Framework) => any,
): Framework
export {when}
//# sourceMappingURL=when.d.ts.map
