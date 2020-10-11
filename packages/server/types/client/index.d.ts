import {Configuration} from 'webpack'
/**
 * Injects webpack.entry items with hot module scripts.
 */
export declare const injectClient: InjectClient
/**
 * Inject webpack entrypoints with client HMR handling script(s).
 */
export declare type InjectClient = (
  props: InjectionProps,
) => Configuration['entry']
/**
 * Requires entrypoints indexed as <K, V>
 */
interface InjectionProps {
  entrypoints: Configuration['entry']
}
export {}
//# sourceMappingURL=index.d.ts.map
