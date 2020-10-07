import Webpack from 'webpack'
/**
 * CSS Module
 *
 * @see {Webpack.Module.Rule}
 */
declare namespace CSS {
  type Patterns = Build.Rule.Factory<Build.Rule.Conditional>
  type Exclude = Build.Rule.Factory<Build.Rule.Conditional>
  type Loaders = Build.Rule.Factory<Webpack.RuleSetRule[]>
}
/**
 * CSS: Test
 */
export declare const test: CSS.Patterns
/**
 * CSS: Exclude
 */
export declare const exclude: CSS.Exclude
/**
 * CSS: Loaders
 * {@see Use}
 */
export declare const use: CSS.Loaders
export {}
//# sourceMappingURL=css.d.ts.map
