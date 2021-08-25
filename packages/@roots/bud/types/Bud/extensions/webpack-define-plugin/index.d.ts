import {DefinePlugin} from 'webpack'
interface Options {
  definitions: DefinePlugin['definitions']
}
export declare const name: string | number,
  make: import('@roots/bud-framework/types/Module').Module.Make<
    DefinePlugin & {
      apply: any
    },
    Options
  >,
  when: import('@roots/bud-framework/types/Module').Module.When<Options>,
  options: any
export {}
//# sourceMappingURL=index.d.ts.map
