import {Framework} from '..'
interface path {
  (
    this: Framework,
    key: keyof Framework.Locations & string,
    ...path: string[]
  ): string
}
interface path {
  (
    key: keyof Framework.Locations & string,
    ...path: string[]
  ): string
}
declare const path: path
export {path}
//# sourceMappingURL=path.d.ts.map
