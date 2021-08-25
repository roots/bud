import type {Framework} from '@roots/bud-framework'
declare class Base {
  normalizeInput<T = any>(
    input: T | ((app: Framework) => T),
  ): (app: Framework) => T
}
export {Base}
//# sourceMappingURL=Base.d.ts.map
